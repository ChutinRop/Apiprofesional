import { Module } from '@nestjs/common';
import { ProductModule } from './productos/productos.module';

@Module({
  imports: [ProductModule],
})
export class AppModule {}