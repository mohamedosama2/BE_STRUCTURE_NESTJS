import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
  Inject,
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
import { User } from 'src/users/models/_user.model';
import { CheckCodeToResetDto } from './dto/check-code-to-reset.dto';
import { UsersService } from 'src/users/users.service';
import { FilterUserDto } from 'src/users/dto/filter-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

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
  async register() {
    for (let i = 0; i < 100000; i++) {}
    return 'OK';
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
  @Post('/check-code-to-reset')
  async checkCodeToReset(@Body() { phone, code }: CheckCodeToResetDto) {
    return await this.phoneConfirmationService.verificationCode({
      phone,
      code,
    });
  }

  @Public()
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
