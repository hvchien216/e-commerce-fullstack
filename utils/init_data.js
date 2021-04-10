const variantProduct = [
  { name: 'S' },
  { name: 'M' },
  { name: 'L' },
  { name: 'XL' },
  { name: 'XXL' },
  { name: 'XXXL' },
  { name: '35' },
  { name: '35.5' },
  { name: '36' },
  { name: '36.5' },
  { name: '37' },
  { name: '37.5' },
  { name: '38' },
  { name: '38.5' },
  { name: '39' },
  { name: '39.5' },
  { name: '40' },
  { name: '40.5' },
  { name: '41' },
  { name: '41.5' },
  { name: '42' },
  { name: '42.5' },
  { name: '43' },
  { name: '43.5' },
  { name: '44' },
  { name: '44.5' },
  { name: '45' },
];

const brandProduct = [
  { name: 'CONVERSES' },
  { name: 'FILA' },
  { name: 'ADIDAS' },
  { name: 'DOMBA' },
  { name: 'MLB' },
  { name: 'PUMA' },
  { name: 'VANS' },
  { name: 'NIKE' },
]

const categoryData = [
  { _id: 'SNEAKER' },
  { _id: 'SLIDE/SANDAL' },
  { _id: 'BAG' },
  { _id: 'CLOTHING' },
  { _id: 'ACCESSORIES' },
  { _id: 'SALES' },
]

const productsInStore = [
  {
    name: "ULTRA BOOST 20 FROST MINT",
    slug_name: "ultra-boost-20-frost-mint",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'FV8323',
    category_id: 'sneaker',
    brand_id: { _id: '605963c5d06dd2152cbd4750' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/ae8d7b3e-915f-48f5-9d5f-978167b86328_c09bfd8f89b64ae9a854c4f9683a4c0c_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/0ddf0853-8802-4582-a0ff-608122f46ba7_c6e8a6c99eeb4eccbd6c5b85b20c858b_master.jpg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/f10805d8-285f-4c79-88be-87b7f083dde1_caeb3502c6d64768b331280a1b194120_master.jpg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 2490000,
        discount_rate: 22,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '42'
        },
        unit_price: 2490000,
        discount_rate: 30,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '42.5'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "NIKE AIR FORCE 1 WHITE GOLD",
    slug_name: "nike-air-force-1-white-gold",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'CT1989-100',
    category_id: 'sneaker',
    brand_id: { _id: '605963c5d06dd2152cbd4755' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/17133249-9736-4a95-889d-910ee1456995_fd5b4beeb941411baaf2937c718c3ad9_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/31443ca7-3dfe-4222-8574-f93684202fc2_e04f45d910e74ee092bf12e3d2e3a823_master.jpg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/f8f48610-42ce-4e4f-9df7-c13e78ad268e_b96b878d7db849ac93bddbf9c34a0f4f_master.jpg',
        primary: false
      },
    ],
    variants: [
      // {
      //   variant: {
      //     name: '36'
      //   },
      //   unit_price: 2990000,
      //   discount_rate: null,
      //   inStock: 55,
      //   saled: 233,
      // },
      {
        variant: {
          name: '38'
        },
        unit_price: 2990000,
        discount_rate: 11,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '42'
        },
        unit_price: 2990000,
        discount_rate: 6,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '42.5'
        },
        unit_price: 2990000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 2,
    comment: []
  },
  {
    name: "CONVERSES 1970S LOW SUNFLOWER",
    slug_name: "converses-1970s-low-sunflower",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: '162063C',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd158' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/402c4f15-984d-4bb5-8a56-42b6b4fe5d2d_087fc24871df46cfb8fdf7b43eff5e7d_master.jpeg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 1590000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 1590000,
        discount_rate: 22,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 1590000,
        discount_rate: 30,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '42.5'
        },
        unit_price: 1590000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "CONVERSES 1970S LOW SUNFLOWER",
    slug_name: "converses-1970s-low-sunflower",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: '162053C',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd158' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/8e0f52a2-b8f6-4792-8884-51aaaa3e542f_6d52b172d87c44c2877378a1bc867d6c_master.jpeg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 1690000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 1690000,
        discount_rate: 22,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 1690000,
        discount_rate: 30,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '42.5'
        },
        unit_price: 1690000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "CONVERSES 1970S HIGH BLACK FIRE",
    slug_name: "converses-1970s-high-black-fire",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: '165024C',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd158' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/12ff82a2-dc66-4b28-818f-b225509abea3_0d1c7c593bdd42629d12d679c79f222d_master.jpeg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 2390000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 2390000,
        discount_rate: 22,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 2390000,
        discount_rate: 22,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 2390000,
        discount_rate: 30,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 2390000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "CONVERSES 1970S HIGH BLACKWHITE",
    slug_name: "converses-1970s-high-blackwhite",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: '162050C',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd158' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/27bbe291-91fa-4e05-9b40-190a3ccfd453_858c9772b4e24afabcaef9126be3a509_master.jpeg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 1690000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 1690000,
        discount_rate: 22,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 1690000,
        discount_rate: 22,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 1690000,
        discount_rate: 30,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 1690000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "FILA DISRUPTOR 2 WHITE",
    slug_name: "fila-disruptor-2-white",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'FS1HTA1071X-26',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd159' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/0ab07427-0671-4428-9bbe-aadf5291f988_5b9666a0c0624435a19fbabcbabbd221_master.jpeg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 1990000,
        discount_rate: 50,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 1990000,
        discount_rate: 50,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 1990000,
        discount_rate: 50,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 1990000,
        discount_rate: 50,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 1990000,
        discount_rate: 50,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "ULTRA BOOST 2021 ACTIVE TEAL",
    slug_name: "ultra-boost-2021-active-teal",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'FZ1921',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15a' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/e2f875c9-cd47-4d55-a49b-d16e0077bdd1_d19bf3c0a9f54e3f804b738847f96dec_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/a710d61e-52a8-4a5d-b748-c3817d2846d7_625bfa534cf748469b26e06704f9c5e3_master.jpg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/e2f875c9-cd47-4d55-a49b-d16e0077bdd1_d19bf3c0a9f54e3f804b738847f96dec_master.jpg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 1990000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 1990000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 1990000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 1990000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 1990000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "ULTRA BOOST 2021 ALL GREY",
    slug_name: "ultra-boost-2021-all-grey",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'FY0432',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15a' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/5cc31a80-b662-4975-af02-0340f34739aa_f413cf014a25475789aa4defe5bef074_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/c7b27df7-a313-4c8a-b2b6-5b1b639a6deb_7e8d45498a464aceb026df088f686028_master.jpg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/85ec7e95-b062-479f-ab5b-3c4afa6666fd_90c3f9fd4dc642fa95e595c0e2dc75ce_master.jpg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 2790000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 2790000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 2790000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 2790000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 2790000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "ULTRA BOOST 1.0 DNA COOKIE CREAM",
    slug_name: "ultra-boost-10-dna-cookie-cream",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'H68156',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15a' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/4b11b638-5eba-4038-90ff-b66d59878fbc_3e0d8059b4c5496a9adeb28d144de0f6_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/9dc37f69-deba-4c6b-9b70-25d06d409f2f_85c9afa565b84135939568b3c5514429_master.jpg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/62f16736-8f65-462c-9e9f-7af2bfe0029d_392570bd1a0249fca93c4e95c64f08d5_master.jpg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 3190000,
        discount_rate: 6,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 3190000,
        discount_rate: 6,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 3190000,
        discount_rate: 6,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 3190000,
        discount_rate: 6,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 3190000,
        discount_rate: 6,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "NMD R1 TRIPLEWHITE",
    slug_name: "nmd-r1-triplewhite",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'H01903',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15a' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/cf1935cc-855d-41de-b7b4-22b533fe36c7_50d366d7f54c4e2e9003b886fda4f35f_master.jpg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "NMD R1 CLOUD WHITE RED/BLUE",
    slug_name: "nmd-r1-cloud-white-redblue",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'FV3642',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15a' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/7a35b176-7629-4b02-89db-3a819dca5295_8b05cbd81b63490d8b275ab2feca4c14_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/7450c9b5-64e3-4507-bcc4-0c93db4aa198_45943cd69290435bb06b4699941f8fbb_master.jpg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/219f8b96-a363-49e8-8ddc-c3f7c8450b49_72102b287bb141938eda12b3d1701e54_master.jpg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 1690000,
        discount_rate: 12,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 1690000,
        discount_rate: 12,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 1690000,
        discount_rate: 12,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 1690000,
        discount_rate: 12,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 1690000,
        discount_rate: 12,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "NMD R1 ALLRED",
    slug_name: "nmd-r1-allred",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'FW0706',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15a' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/e36b5245-838d-4062-adeb-f0b4aa7d1e0f_8ab67fbf9fe04d289c17c80c8f2072e6_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/38609b1c-1e51-43ee-84c1-f6a83582fa4a_ce6e71fe286e4957bbd990fbeb8003e0_master.jpg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 3500000,
        discount_rate: 57,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 3500000,
        discount_rate: 57,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 3500000,
        discount_rate: 57,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 3500000,
        discount_rate: 57,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 3500000,
        discount_rate: 57,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "ULTRA BOOST 20 ALLBLACK",
    slug_name: "ultra-boost-20-allblack",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'EG0691',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15a' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/b10b6f1f-a4f3-4b0f-a143-1811bbab5ad3_41336a2a03f549968ab18dec0604855d_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/85f11556-80bc-445b-b181-78b4e9139b57_46ea4ad47eb74ea08347f2905f23eb1f_master.jpg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/36056904-ee4b-40a2-aa66-cf84663c2f90_03fe6b751b0a4e6d8bf1ab0ebe366012_master.jpg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "ADIDAS STAN SMITH POWER BERRY",
    slug_name: "adidas-stan-smith-power-berry",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'FW2524',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15a' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/894b0648-fbc2-4fdd-9209-56ce496774d7_edf27b55e72f4fc8bbfa93750eeae5de_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/894b0648-fbc2-4fdd-9209-56ce496774d7_edf27b55e72f4fc8bbfa93750eeae5de_master.jpg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 1590000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 1590000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 1590000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 1590000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 1590000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "ADIDAS STAN SMITH GLOW PINK",
    slug_name: "adidas-stan-smith-glow-pink",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'FW2522',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15a' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/7ac34a91-f170-4d8c-a3a9-84adc57c8c3c_9358c91b5a8f4b1084b769b23b06a7e4_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/154b5b80-676a-483c-be14-a4020d4a0dec_e02378af255a4c01be97d94bfc5d0e7d_master.jpg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 1590000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 1590000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 1590000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 1590000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 1590000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "ULTRA BOOST 20 ROYAL BLUE",
    slug_name: "ultra-boost-20-royal-blue",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'FY9039',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15a' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/74b59978-60ee-4827-988c-5bc8f9352852_e32cffcce0ad4f368051e9b2c1fb4fcf_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/f8f0d308-1cfb-47d1-bf23-079df70443f1_a1778bff7c9f4aa198e8897f90860348_master.jpg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/bdbde752-fd14-4632-80f4-05dd515ca327_cfbf790a90dc495ea47f2205edfc7409_master.jpg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "ULTRA BOOST 20 SKYTINT WOMEN",
    slug_name: "ultra-boost-20-skytint-women",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'FV8336',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15a' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/22fb9a47-06a2-4615-b774-c1b2598b930e_aba7aaf762e8461aa04de0fed0715c51_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/eff01e7c-6c41-4359-aecd-c438cc01c942_f2bee094ff0e4af3969162241548ad9c_master.jpg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/e3b09f1e-2cbf-422d-8910-6a2f71823258_0f6d14a0c5714a4b9746d5755cb227c3_master.jpg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/60d4309a-fe78-43fb-bb4c-659bf8fd26ba_9fd5053a74294876af7d29986b95527c_master.jpg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "ULTRA BOOST 20 COLLEGIATE NAVY WOMEN",
    slug_name: "ultra-boost-20-collegiate-navy-women",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'FV8357',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15a' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/5a067aac-a157-4321-b4c5-b6f4cea42d7d_2c1c4e5675a94bb5934ffb5789747346_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/568030d1-0df9-4a5a-bc04-80384989b76e_b31c7d78ed6846828784e16692d05cf9_master.jpg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/b408619f-cc93-4a8a-a038-97eb147e32c7_d6757aed59284f7cb2073a993bc0cf4d_master.jpg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "ULTRA BOOST 19 CRYSTAL WHITE BROWN",
    slug_name: "ultra-boost-19-crystal-white-brown",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'G27492',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15a' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/cxcxcx_c9e5f62464134558b6944f97f82a01cc_master.jpg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "ULTRA BOOST 20 PRIME SHARP BLUE",
    slug_name: "ultra-boost-20-prime-sharp-blue",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'EG0768',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15a' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/xaxx_36c8031d5f59440489026061790587ff_master.jpg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "ULTRA BOOST 4.0 C.RDY DNA",
    slug_name: "ultra-boost-40-crdy-dna",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'FW8696',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15a' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/xx_d272b8454a3742f4a13e429e947ae56b_master.jpg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "ADIDAS FALCON ICEY PINK",
    slug_name: "adidas-falcon-icey-pink",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'EF1994',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15a' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/124031649_805588723570695_3538815290173574413_n_2bf68aa5df5349be9af7e8f3a2c3bb11_master.jpg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 2290000,
        discount_rate: 35,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 2290000,
        discount_rate: 35,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 2290000,
        discount_rate: 35,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 2290000,
        discount_rate: 35,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 2290000,
        discount_rate: 35,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "ULTRA BOOST 20 ALLBLACK SILVER",
    slug_name: "ultra-boost-20-allblack-silver",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'FV8333',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15a' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/123535791_2377362309074335_6056133020760722065_o_f02f3d402fb14f81a6fa14a94a8880d9_master.jpg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 5000000,
        discount_rate: 50,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "ULTRA BOOST 20 CLOUD SIGNAL PINK",
    slug_name: "ultra-boost-20-cloud-signal-pink",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'EG5201',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15a' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/123186168_2377708962373003_131830746470578403_o_9c9d40f492ac4b70a756ab1bd40bfafc_master.jpg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "ADIDAS FALCON GREY TWO",
    slug_name: "adidas-falcon-grey-two",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'EE5106',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15a' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/ee5967b3-5ace-4c0e-9dfe-b10258a8a034_3a18ae782a19410eadf358830b907bdc_master.jpeg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 2290000,
        discount_rate: 35,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 2290000,
        discount_rate: 35,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 2290000,
        discount_rate: 35,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 2290000,
        discount_rate: 35,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 2290000,
        discount_rate: 35,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "ULTRA BOOST 19 SOLAR ORANGE",
    slug_name: "ultra-boost-19-solar-orange",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'G27519',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15a' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/0defd708-b2a5-4d19-90a7-b9f4f5fe822d_ff73da8037f449d8a24c6a29a92f4fab_master.jpeg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 5000000,
        discount_rate: 54,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 5000000,
        discount_rate: 54,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 5000000,
        discount_rate: 54,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 5000000,
        discount_rate: 54,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 5000000,
        discount_rate: 54,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "ULTRA BOOST 19 TRACE CARGO",
    slug_name: "ultra-boost-19-trace-cargo",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'G27514',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15a' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/5c57b808-2e32-42c8-a1d8-3eb55c3f7468_3c169c9076584509a73a68b849ba5b82_master.jpeg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/b930f50c-6e03-419c-b3e7-592543a12e5a_be5f819f987141139bece332f56fe335_master.jpeg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/05884293-2985-444f-95ec-1533855ab35d_b8576e4d1f3c4932a8e7ffae20ce302c_master.jpeg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/950d1f28-8d8a-42f8-a0ee-646b09108e59_00acdec893854a918415c0093bb7cb16_master.jpeg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 5000000,
        discount_rate: 54,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 5000000,
        discount_rate: 54,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 5000000,
        discount_rate: 54,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 5000000,
        discount_rate: 54,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 5000000,
        discount_rate: 54,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "MLB CHUNKY BOSTON",
    slug_name: "mlb-chunky-boston",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: '',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15c' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/a1433e97-27ef-4194-9318-544b0864e33f_41c23fc772394044aa9550e34b898de1_master.jpeg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/f6b9712b-56a9-4da8-982f-a505795fe32c_6bcaa6c766b24f6cb214d78f6911d138_master.jpeg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/0bfad296-57bb-46e7-b70d-5395bcecab3f_9e0ebdeb6e934508a7ebf2f13913313e_master.jpeg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/d89d73b2-ca9f-438c-b644-5d89f688467b_2137116a8a974cdebd0e128adbc6d652_master.jpeg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "MLB CHUNKY LOGO YANKEE",
    slug_name: "mlb-chunky-logo-yankee",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: '',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15c' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/b497dbff-adf1-4c3f-b6d4-829b7ff73979_1f8abf33f6774a46be6720f1cd5fe8aa_master.jpeg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/33683252-e1c5-467a-a77f-5b5005d05602_bcd6f81dcb00404a966c5b9a9e6ebce0_master.jpeg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/d0110e0a-743d-45e9-9e3e-38f788c3db7b_cc6a3c3eab8d4ec7a074adf770b3306e_master.jpeg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/c092ef6b-34df-4819-908e-6af31207c547_4fa7616b2e294713b1be7a8019e14a81_master.jpeg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "MLB MULE BLACK",
    slug_name: "mlb-mule-black",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: '32SHS1111-50L',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15c' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/a1c56d35-e94b-4697-9d4c-33828028dcdb_d8c24cb175ca4932a39a9f4896554d1d_master.jpg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 1490000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 1490000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 1490000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 1490000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 1490000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "MLB MULE YANKEE PLAYBALL",
    slug_name: "mlb-mule-yankee-playball",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: '32SHS1011-50W',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15c' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/lu_41e8fe2db0fe40e682a6c033fc925fe2_master.jpg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 1490000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 1490000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 1490000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 1490000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 1490000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "MLB YANKEE 2020",
    slug_name: "mlb-yankee-2020",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: '32SHC1011-50B',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15c' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/7a150b8c-c2b3-4a94-9ea6-0d33f067773b_07fc4d9c0ed7444a92f7144066ab0fbe_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/88ca7389-c600-47ad-a74e-483fe618c8f8_7de7689bf45f46d0b43a6d2f6baf6142_master.jpg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/3375d5ac-3715-4884-8e4d-168885fdb767_f4e7c98ff24f48db83adc32023c2c395_master.jpg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "MLB YANKEE 2021 PLAY PIXEL",
    slug_name: "mlb-yankee-2021-play-pixel",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: '32SHCD111-50I',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15c' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/8301c6d0-5c2d-4689-8a83-394b01e0d197_cbe49635a2ce4b028e17b91c0aa030dd_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/478af55e-5180-4a60-84a8-b9e99bc05282_fee5c683abbe427486738f4d1a39c90f_master.jpg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/3fe7a1bc-17f2-4fa9-9fdc-4d579101b10a_5508e5948a6b4656b63c73ddb3d28de3_master.jpg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/0c09c700-ff22-4067-bf93-4919caef4bfb_cc93740006f74da8b16416fc5a5e4d99_master.jpg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "MLB YANKEE GUM 2021 GRAFFITY",
    slug_name: "mlb-yankee-gum-2021-graffity",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: '32SHCG111-50I',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15c' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/c447f352-dff2-4f72-be9b-65c646491427_d605cb7746db4ccbb821cf908b66c7f5_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/e02bc338-5415-4a4a-ad73-49528a6953ce_c3343dab1c0c467ba4401c0d0cd6185f_master.jpg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/e1ce647b-2740-4ae1-aee7-8f354f8d8cbd_4fc52745e4e948c3aee7b75e5d86a2fa_master.jpg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 2490000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "MLB CHUNKY LA",
    slug_name: "mlb-chunky-la",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: '32SHC1011-07W',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15c' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/c75492df-e5f5-4f25-aef9-54040512998f_db9722e09ec341478ee40fcc65a6ef0e_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/ba63e90d-df1a-47aa-8d75-efe3416f2dd9_9f92b73a4a924b20a7cc65679f24341a_master.jpg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/3b7e653c-dd47-47e4-ae52-e3949e67cd53_bf4ca6cc77be48999436bcedc1d94069_master.jpg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "MLB MULE MONO DENIM NHẠT",
    slug_name: "mlb-mule-mono-denim-nhat",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: '32SHSD111-50U',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15c' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/b1405cfe-3373-4b9b-b415-25238e89ec30_e7925281b7c84d19ba43fbd78465bc28_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/35b77ac4-7773-4077-a468-913b4e6dc8ae_53233988932541ddaf8fed16a37d60dc_master.jpg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/58e16c9a-45f4-4e95-80bf-a2babebf00d8_2b0c94e19b96451688f4e358e6595f43_master.jpg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 1590000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 1590000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 1590000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 1590000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 1590000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "NIKE AIR FORCE 1 WHITE GOLD METALLIC",
    slug_name: "nike-air-force-1-white-gold-metallic",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'CT1989-100',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15f' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/17133249-9736-4a95-889d-910ee1456995_fd5b4beeb941411baaf2937c718c3ad9_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/31443ca7-3dfe-4222-8574-f93684202fc2_e04f45d910e74ee092bf12e3d2e3a823_master.jpg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/f8f48610-42ce-4e4f-9df7-c13e78ad268e_b96b878d7db849ac93bddbf9c34a0f4f_master.jpg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 3190000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 3190000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 3190000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 3190000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 3190000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "NIKE AIR FORCE 1 WHITE LOVE FOR ALL",
    slug_name: "nike-air-force-1-white-love-for-all",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'CV8482-100',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15f' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/5c2a205b-99e1-44cb-ad38-ddd62c253fe0_f9b854418a2940229bb134bf3229c86c_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/df7d8a1b-9f2c-4a54-b305-dc6523e0fc0c_b2a72c88d3fe4318a330fccb6fb05be6_master.jpg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/0869e65c-768b-400a-b167-79c93bbe3a2b_26338a5415c24e64af6e6c51c3edd8b3_master.jpg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 3690000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 3690000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 3690000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 3690000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 3690000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "NIKE AIR FORCE 1 (WMN/MEN SIZE ) LOW ALLWHITE",
    slug_name: "nike-air-force-1-wmnmen-size-low-allwhite",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: '',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15f' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/1df84df6-3c41-4a59-8c23-5e127e4580a9_706f37360de6422090ce3ebea5a6c2ee_master.jpg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 2790000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 2790000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 2790000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 2790000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 2790000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "NIKE AIR FORCE 1 BLACK BLUE/RED",
    slug_name: "nike-air-force-1-black-bluered",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'CT2816-001',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15f' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/bd6446f4-cdca-4c53-ae86-e1a4b58d2e50_c77538975d1c416a9dee20f9ea8a7853_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/640a26d5-4426-415b-a574-c2ec73ed5857_482241155cd14825b2b8bdde60ec67f6_master.jpg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/060cee46-9858-4ba0-9cfc-bacf49aaa264_dee38193974e410fbeddf4654b23a1b1_master.jpg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 2590000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 2590000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 2590000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 2590000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 2590000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "NIKE AIR FORCE 1 SHADOW 'BEKIND'",
    slug_name: "nike-air-force-1-shadow-bekind",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'DC2199-100',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15f' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/767f2bfd-0508-4c79-9f90-579c6a2a58db_dd468224f1404abab0755323b83416aa_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/f44e2e4a-61aa-4552-8ed1-88ad7dd86225_8d53ca9621254d61ad50d059ca9dec6c_master.jpg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/0096743e-f6e8-44f1-95e9-19c94962c79b_46ab57aa384444f08db93bc892a22ec8_master.jpg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 4790000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 4790000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 4790000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 4790000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 4790000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "JORDAN 1 LOW BLEU LAZER",
    slug_name: "jordan-1-low-bleu-lazer",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: '553558-410',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15f' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/8b73807a-143f-4914-9724-dfe9207a65fd_eb05ebe5c0c64f5b819d75fe21e85889_master.jpg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 3690000,
        discount_rate: 5,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 3690000,
        discount_rate: 5,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 3690000,
        discount_rate: 5,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 3690000,
        discount_rate: 5,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 3690000,
        discount_rate: 5,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "AIR JORDAN 1 LOW PATENT MULTI LOW",
    slug_name: "air-jordan-1-low-patent-multi-low",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'DB5455-100',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15f' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/dsdsds_c14eb9a19e14492daef2fc9158f39f89_master.jpg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 3890000,
        discount_rate: 5,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 3890000,
        discount_rate: 5,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 3890000,
        discount_rate: 5,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 3890000,
        discount_rate: 5,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 3890000,
        discount_rate: 5,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "NIKE AIR FORCE 1 WHEAT HIGH",
    slug_name: "nike-air-force-1-wheat-high",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'CK0262-700',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15f' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/d77d688a-4fd4-4834-944c-9c54bf2f14cc_e16b16708c4b46128480e4892242d133_master.jpeg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 2590000,
        discount_rate: 27,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 2590000,
        discount_rate: 27,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 2590000,
        discount_rate: 27,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 2590000,
        discount_rate: 27,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 2590000,
        discount_rate: 27,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "JORDAN 1 MID TURF ORANGE",
    slug_name: "jordan-1-mid-turf-orange",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'BQ6931-802',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15f' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/7c9de903-a630-454a-aa50-fe510f9cf706_0a669a704ebc4cafba07f1147e920c35_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/5a08d2b3-2a4e-4f71-b52c-f6d89d231e7b_6eb9b9bfb43e42829eb57042b81b64f0_master.jpg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/cf6dc3c4-ccd5-47d0-985f-d5afc14c1bf3_ff1f5a450f854607a753e90fc89857c8_master.jpg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 6180000,
        discount_rate: 3,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 6180000,
        discount_rate: 3,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 6180000,
        discount_rate: 3,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 6180000,
        discount_rate: 3,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 6180000,
        discount_rate: 3,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "JORDAN 1 MID MULTI PATENT W",
    slug_name: "jordan-1-mid-multi-patent-w",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'CV5276-001',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15f' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/0d860df0-5019-4287-9cd2-4610e483f6f9_55c5e76cf1bf46d9810aface76d6fee6_master.jpeg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/a49294e5-3018-427d-bd75-92bb26cb75c5_24f3af435612416aa6e3b43a671b1de7_master.jpeg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/95247da3-8ba0-4d6e-b207-2eeefe6590d0_119f372d41c2483fb88f9c70be69ca3f_master.jpeg',
        primary: false
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/3bfcb79d-84e2-45bd-a67b-c8281ddf8b1d_c4bf273c9b7f472e9ce9b57dab4f3891_master.jpeg',
        primary: false
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 4190000,
        discount_rate: 5,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 4190000,
        discount_rate: 5,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 4190000,
        discount_rate: 5,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 4190000,
        discount_rate: 5,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 4190000,
        discount_rate: 5,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "VANS OLDSKOOL BLACKWHITE CLASSIC",
    slug_name: "vans-oldskool-blackwhite-classic",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: '',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15e' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/36c3e269-2fb3-40c2-b0b2-a3e89b142c1a_b3a5f952c99d401a966f03af52faf60d_master.jpeg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 1200000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 1200000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 1200000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 1200000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 1200000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "VANS OLDSKOOL STYLE 36 REDLINE",
    slug_name: "vans-oldskool-style-36-redline",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: 'VNOA3DZ3OXV5',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15e' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/36c3e269-2fb3-40c2-b0b2-a3e89b142c1a_b3a5f952c99d401a966f03af52faf60d_master.jpeg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 2390000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 2390000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 2390000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 2390000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 2390000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "PUMA RS-X THE UNITY COLLECTION",
    slug_name: "puma-rs-x-the-unity-collection",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: '373308-01',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15d' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/4dcb83ff-e12f-4cb6-9c93-d782604e8eb6_a7da2771496b4037af000488cd12015d_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/53344715-fb58-465f-9e56-5aba6a3c4486_b524f8fc63fc4e8b8fa62bb7a34f8fe9_master.jpg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/0049b02b-17b6-41ed-96ea-5b34b22ef465_c74a706571a0489587711d234a64d30b_master.jpg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "PUMA RS-X SOFTCASE",
    slug_name: "puma-rs-x-softcase",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: '369819-02',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15d' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/5e453c92-73e7-4852-8ffc-df9bd6db3bab_f9a93868c81d42c1970f6742e18961e1_master.jpg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 1890000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "PUMA RIBBON VIKKY",
    slug_name: "puma-ribbon-vikky",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: '366419-02',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15d' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/2525_a87e048cfd944f8aa1b95b681dd35bec_master.jpg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 1290000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 1290000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 1290000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 1290000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 1290000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "PUMA RS-X METALLIC WN'S",
    slug_name: "puma-rs-x-metallic-wns",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: '370501-01',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15d' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/metalic_c69aa6c2553144b4a1f05546150bb427_master.jpg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 1590000,
        discount_rate: null,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 1590000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 1590000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 1590000,
        discount_rate: null,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 1590000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "PUMA RS-X SUPER RED",
    slug_name: "puma-rs-x-super-red",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: '372884-01',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15d' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/06cca66d-e95a-408b-bba9-eda93b4c3b25_71bb62a505014d82863a82276acb7f17_master.jpeg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/fce57259-1840-44f5-a55e-2cd4a8d35b3a_0a1cff7458d14b0285ca560848a032df_master.jpeg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/09307363-d986-4a26-9596-d6971fb51773_4a9e8a79bfd04165b151fcca2bd7c5a8_master.jpeg',
        primary: true
      },
      {
        url: 'https://product.hstatic.net/1000383440/product/4e5b402d-e775-4482-a5ee-bf03fab64df0_b41ba866ec7448079f8a593eda93d916_master.jpeg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 3000000,
        discount_rate: 37,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 3000000,
        discount_rate: 37,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 3000000,
        discount_rate: 37,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 3000000,
        discount_rate: 37,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 1590000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "PUMA RS-X TOY",
    slug_name: "puma-rs-x-toy",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: '369449-02',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15d' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/77e48a47-2a14-45bd-9656-10ae98cf6f78_ae2c93cd5fc7449ba19a1a6e479da376_master.jpeg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 3500000,
        discount_rate: 32,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 3500000,
        discount_rate: 32,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 3500000,
        discount_rate: 32,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 3500000,
        discount_rate: 32,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 3500000,
        discount_rate: 32,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
  {
    name: "PUMA RS-X PATENT",
    slug_name: "puma-rs-x-patent",
    description: `
    -Hàng chính hãng
    -Giao hàng Toàn Quốc
    -Thanh Toán khi nhận hàng
    -Bảo hành chính hãng trọn đời sản phẩm
    -Bảo hành keo , chỉ trọn đời sản phẩm
    -Giao hàng Nhanh 60p tại Sài Gòn`,
    code: '372780-01',
    category_id: 'sneaker',
    brand_id: { _id: '6059b9e39ccd8a18e86bd15d' },
    images: [
      {
        url: 'https://product.hstatic.net/1000383440/product/5a4aef0b-0f7a-463b-bc56-a19b7d7659a9_80a855cfa58f45b1a1ecb4f5d5b40fb7_master.jpeg',
        primary: true
      },
    ],
    variants: [
      {
        variant: {
          name: '36.5'
        },
        unit_price: 1990000,
        discount_rate: 32,
        inStock: 55,
        saled: 233,
      },
      {
        variant: {
          name: '37'
        },
        unit_price: 1990000,
        discount_rate: 32,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '38'
        },
        unit_price: 1990000,
        discount_rate: null,
        inStock: 60,
        saled: 11,
      },
      {
        variant: {
          name: '41'
        },
        unit_price: 1990000,
        discount_rate: 32,
        inStock: 80,
        saled: 22,
      },
      {
        variant: {
          name: '44'
        },
        unit_price: 1990000,
        discount_rate: null,
        inStock: 70,
        saled: 44,
      },
    ],
    rate: 1,
    comment: []
  },
]
module.exports = {
  variantProduct,
  brandProduct,
  productsInStore,
  categoryData
};