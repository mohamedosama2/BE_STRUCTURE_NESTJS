import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
  Inject,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './decorators/public.decorator';
import { PhoneConfirmationService } from 'src/phone-confirmation/phone-confirmation.service';
import { LoginGoogleDto } from './dto/login-google.dto';
import { LoginFacebookDto } from './dto/login-facebook.dto';
import { GoogleOauthGuard } from './guards/googleToken.guard';
import { REQUEST } from '@nestjs/core';
import { User, UserRole } from 'src/users/models/_user.model';
import { CheckCodeToResetDto } from './dto/check-code-to-reset.dto';
import { UsersService } from 'src/users/users.service';
import { FilterUserDto } from 'src/users/dto/filter-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly phoneConfirmationService: PhoneConfirmationService,
    @Inject(REQUEST) private readonly req: Record<string, unknown>,
  ) {}

  @Public()
  @Post('/signup')
  async register(@Body() RegisterDto: RegisterDto) {
    let user = await this.authService.register(RegisterDto);
    await this.phoneConfirmationService.sendSMS({
      phone: RegisterDto.phone,
    });
    return user;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() LoginDto: LoginDto) {
    return await this.authService.login(LoginDto);
  }

  @Public()
  @UseGuards(GoogleOauthGuard)
  @Post('/login-googel')
  async loginGoogle(@Body() _loginGoogleData: LoginGoogleDto) {
    return await this.authService.loginGoogle(this.req.me as User);
  }

  @Public()
  @Post('/login-facebook')
  async loginFacebook(@Body() { accessToken }: LoginFacebookDto) {
    return await this.authService.loginFacebook({ accessToken });
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: [CheckCodeToResetDto] })
  @ApiQuery({ name: 'role', enum: UserRole }) // must this to check list
  @Post('/check-code-to-reset')
  async checkCodeToReset(
    @Body() test: CheckCodeToResetDto[],
    @Query('role') role: UserRole,
  ) {
    // return await this.phoneConfirmationService.verificationCode({
    //   phone,
    //   code,
    // });
  }

  @Public()
  @ApiOkResponse({
    description: 'in case of successfull',
    type: ResetPasswordDto,
  })
  @ApiBadRequestResponse({
    description: 'in case of fail',
    type: LoginGoogleDto,
  })
  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  async resetPassword(@Body() { phone, code, password }: ResetPasswordDto) {
    await this.phoneConfirmationService.verificationCode({ phone, code });
    return await this.usersService.update(
      { phone } as FilterUserDto,
      { password } as UpdateUserDto,
    );
  }
}
