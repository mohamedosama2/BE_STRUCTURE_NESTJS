import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, ObjectId, Schema as MongooseSchema } from 'mongoose';
import { UnprocessableEntityException } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';
import { Constants } from '../../utils/constants';
import { Password } from '../../auth/utils/Password';
import { PaymentSchema } from './payment-method.entity';
import { registerPaymentSchemaDiscriminator } from './register-payment-schema-discriminator';
import { Address, AddressSchema } from './address.entity';

export type UserDocument = User & Document;

export enum UserRole {
  ADMIN = 'Admin',
  STUDENT = 'Student',
  TEACHER = 'Teacher',
}

@Schema({
  discriminatorKey: 'role',
  timestamps: true,
  toJSON: {
    getters: true,
    virtuals: true,
    transform: (_, doc: Record<string, unknown>) => {
      delete doc.__v;
      delete doc._id;
      delete doc.password;
      return {
        ...doc,
      };
    },
  },
})
export class User {
  _id: string;

  @Prop({
    index: true,
    unique: true,
    sparse: true,
    match: Constants.EMAIL_REGX,
  })
  email: string;

  @Prop({
    index: true,
    unique: true,
    sparse: true,
    match: Constants.PHONE_REGX,
  })
  phone: string;

  @Prop({
    get: (username: string) => {
      return username.toUpperCase();
    },
    set: (username: string) => {
      return username.trim();
    },
    required: true,
  })
  username: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  enabled: Boolean;

  @Prop()
  photo: string;

  @Prop({ index: true, unique: true, sparse: true })
  facebookId: string;

  @Prop({ index: true, unique: true, sparse: true })
  googleId: string;

  @Prop({ required: true, type: [PaymentSchema] })
  favouritePaymentMethods: unknown[];

  @Prop({ type: AddressSchema })
  address: Address;
}

const UserSchema = SchemaFactory.createForClass(User);

const paymentArraySchema = UserSchema.path(
  'favouritePaymentMethods',
) as MongooseSchema.Types.DocumentArray;
registerPaymentSchemaDiscriminator(paymentArraySchema);

// UserSchema.virtual('NameAndEmail').get(function (this: UserDocument) {
//   return `${this.email} + ${this.username}`;
// });

UserSchema.pre('save', async function () {
  const user = this;

  let nullableFields = ['phone', 'email', 'googleId', 'facebookId'];
  for (let i = 0; i < nullableFields.length; i++) {
    if (user.isModified(nullableFields[i])) {
      const value = user[nullableFields[i]];
      if (value === '' || value === null) user[nullableFields[i]] = undefined;
    }
  }

  let uniqueFields = ['phone', 'apple_id', 'fb_id', 'email'];
  for (let i = 0; i < uniqueFields.length; i++) {
    if (user.isModified(uniqueFields[i])) {
      // be true if was undefined then set value to it , be false if same value set to it
      let value = user[uniqueFields[i]];
      if (value === undefined) continue;
      let filter = {};
      filter[uniqueFields[i]] = value;
      let model = <Model<User>>this.constructor;
      let count = await model.countDocuments(filter);
      if (count) {
        throw new UnprocessableEntityException(
          `${uniqueFields[i]} : ${value} is not a uniqu value`,
        );
      }
    }
  }
  if ((this as UserDocument).password && this.isModified('password')) {
    // (this as UserDocument).password = await hash(
    //   (this as UserDocument).password,
    //   10,
    // );
    (this as UserDocument).password = await Password.hash(
      (this as UserDocument).password,
    );
  }
});

UserSchema.methods.isValidPassword = async function (password) {
  // return compare(password, (this as UserDocument).password);
  return Password.isCorrectPassword(password, (this as UserDocument).password);
};

export { UserSchema };
