import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Cleaning database...')
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // 1. Create Categories
  const catPhones = await prisma.category.create({ data: { name: 'Smartphones' } })
  const catLaptops = await prisma.category.create({ data: { name: 'Laptops' } })
  const catElec = await prisma.category.create({ data: { name: 'Electronics' } }) // <--- NEW
  const catAudio = await prisma.category.create({ data: { name: 'Audio' } })
  const catGaming = await prisma.category.create({ data: { name: 'Gaming' } })
  const catWearables = await prisma.category.create({ data: { name: 'Wearables' } })

  console.log('Stocking shelves...')

  // --- ELECTRONICS (NEW) ---
  await prisma.product.create({
    data: {
      name: 'Samsung 65" 4K QLED TV',
      description: 'Quantum Processor Lite 4K, Smart TV features.',
      price: 1499900,
      oldPriceCents: 1899900,
      categoryId: catElec.id,
      imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800',
      isFeatured: true,
    },
  })
  await prisma.product.create({
    data: {
      name: 'DJI Mini 3 Pro Drone',
      description: 'Lightweight, 4K HDR Video, 34-min flight time.',
      price: 1650000,
      categoryId: catElec.id,
      imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=800',
    },
  })
  await prisma.product.create({
    data: {
      name: 'Canon EOS R50 Camera',
      description: 'Mirrorless Vlogging Camera with 18-45mm Lens.',
      price: 1399900,
      categoryId: catElec.id,
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
    },
  })

  // --- PHONES ---
  await prisma.product.create({
    data: {
      name: 'iPhone 15 Pro',
      description: 'Titanium design, A17 Pro chip. 128GB.',
      price: 2799900,
      categoryId: catPhones.id,
      imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800',
      isFeatured: true,
    },
  })
  
  // --- LAPTOPS ---
  await prisma.product.create({
    data: {
      name: 'MacBook Air M2',
      description: '13.6-inch Liquid Retina display, Midnight.',
      price: 2399900,
      categoryId: catLaptops.id,
      imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800',
    },
  })

  // --- GAMING ---
  await prisma.product.create({
    data: {
      name: 'PlayStation 5 Slim',
      description: 'Digital Edition. 1TB SSD.',
      price: 1199900,
      categoryId: catGaming.id,
      imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=800',
    },
  })
    
  // --- AUDIO ---
  await prisma.product.create({
    data: {
      name: 'Sony WH-1000XM5',
      description: 'Noise canceling headphones.',
      price: 799900,
      categoryId: catAudio.id,
      imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800',
    },
  })

  console.log('Seeding finished.')
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })