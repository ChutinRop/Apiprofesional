import { Module } from '@nestjs/common';
import { ProductService } from './productos.service';
import { ProductController } from './productos.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}