import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'prisma/prisma.service';
import { SearchProductsDto } from './dto/search-products.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto) {
    try{
      return await this.prisma.product.create({
        data: createProductDto,
      });
    }catch(error){
      if(error.code === 'P2002' && error.meta.target.includes('sku')){
        throw new ConflictException(`El SKU ${createProductDto.sku} ya está en uso.`);
      }
    throw error;
    }
  }

  //Enpoint de busqueda avanzada
  async search(searchDto: SearchProductsDto){
    const { page =1, limit =10, sortBy = 'id', order = 'ASC', filters = {} } = searchDto;
    const skip = (page -1 )* limit;

    const where: any = {};

    if(filters.id) where.id = filters.id;
    if(filters.sku) where.sku = filters.sku;
    if(filters.nombre) where.nombre = { contains: filters.nombre, mode: 'insensitive' };
    if(filters.descripcion) where.descripcion = { contains: filters.descripcion, mode: 'insensitive' };

    return this.prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: order.toLowerCase(),
      },
    });
    
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new Error('No se puede eliminar un producto con un stock mayor a cero');
    } 
    return this.prisma.product.delete({
      where: { id },
    });
  }
}