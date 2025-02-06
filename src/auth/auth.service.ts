import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma_db/prisma.service';
import { AuthenticatedUser } from './interfaces/authenticated-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async signIn(email: string, password: string) {
    // Find the owner by email
    const owner = await this.prisma.owner.findUnique({
      where: { email },
      include: {
        business: true // Include business info if needed
      }
    });

    if (!owner) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, owner.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Create JWT payload
    const payload : AuthenticatedUser = { 
      email: owner.email,
      sub: owner.id,
      name: owner.name
    };

    // Return the access token
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}