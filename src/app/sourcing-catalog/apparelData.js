// apparelData.js
export const APPAREL_CATEGORIES = [
  {
    id: 'knit',
    title: 'Knitwear & Jersey',
    items: ['T-Shirts & Polo Shirts', 'Hoodies & Sweatshirts', 'Tank Tops', 'Activewear & Leisurewear'],
    capacity: '1.5 Million Pcs / Month',
    leadTime: '60-75 Days',
    moq: '1,500 Pcs per style',
    products: [
      {
        name: 'Premium Pique Polo',
        fabrication: '100% Combed Cotton / Organic Blend CVC',
        weight: '200 - 220 GSM',
        features: 'High colorfastness to washing, silicone soft-finish, reactive dyed.',
        imagePlaceholder: 'Pique Knit Structure',
        image: '/images/products/polo.png'
      },
      {
        name: 'Classic Luxury Hoodie',
        fabrication: '80% Organic Cotton / 20% Polyester Terry',
        weight: '320 - 360 GSM',
        features: 'Brushed fleece lining, anti-pilling coat, heavy rib cuffs.',
        imagePlaceholder: 'Heavy Fleece Knit',
        image: '/images/products/hoodie.png'
      },
      {
        name: 'Performance Running Tee',
        fabrication: '100% Recycled Polyester (Interlock Mesh)',
        weight: '140 - 160 GSM',
        features: 'Moisture-wicking yarn treatment, antimicrobial finish, breathable.',
        imagePlaceholder: 'Micro-Mesh Interlock',
        image: '/images/products/tee.png'
      },
      {
        name: 'French Terry Lounge Shorts',
        fabrication: '100% Organic Cotton French Terry',
        weight: '280 - 300 GSM',
        features: 'Unbrushed loopback interior, heavy drawstring waist, reinforced side pockets.',
        imagePlaceholder: 'Loopback French Terry',
        image: '/images/products/shorts.png'
      }
    ]
  },
  {
    id: 'woven',
    title: 'Woven Garments',
    items: ['Casual & Formal Shirts', 'Chinos & Cargo Pants', 'Blouses & Tops', 'Lightweight Jackets'],
    capacity: '800,000 Pcs / Month',
    leadTime: '75-90 Days',
    moq: '2,000 Pcs per style',
    products: [
      {
        name: 'Tailored Poplin Shirt',
        fabrication: '100% Egyptian Giza Cotton (Easy-Iron Finish)',
        weight: '110 - 125 GSM',
        features: 'High tensile strength seams, clean collar stitch alignment.',
        imagePlaceholder: 'Poplin Plain Weave',
        image: '/images/products/shirt.png'
      },
      {
        name: 'Cargo Chino',
        fabrication: '98% Cotton / 2% Elastane Stretch Twill',
        weight: '260 - 290 GSM',
        features: 'Heavy duty bar-tack reinforces, YKK zipper fly, enzyme washed.',
        imagePlaceholder: 'Stretch Twill Weave',
        image: '/images/products/chino.png'
      },
      {
        name: 'Trench Coat',
        fabrication: '100% Cotton Gabardine or Cotton/Polyester blend',
        weight: '280-340 GSM',
        features: 'Water-repellent properties due to the tightly packed warp yarns, smooth face with distinct diagonal ribbing, excellent drape and wind resistance.',
        imagePlaceholder: 'Trench Coat Construction',
        image: '/images/products/trenchcoat.png'
      },
      {
        name: 'Classic Corduroy trouser',
        fabrication: '100% Cotton Corduroy',
        weight: '280 - 350 GSM',
        features: 'Distinct vertical pile ridges (wales), velvety hand-feel, durable construction, excellent structural warmth.',
        imagePlaceholder: 'Corduroy Weave',
        image: '/images/products/corduroytrouser.png'
      },
      {
        name: 'Canvas Jacket',
        fabrication: '100% Cotton Canvas or Duck Canvas',
        weight: '320-370 GSM',
        features: 'Heavy duty bar-tack reinforces, Concealed front zip, multi-pocket utility setup.',
        imagePlaceholder: 'Canvas Jacket Construction',
        image: '/images/products/canvasjacket.png'
      },
      {
        name: 'Oxford Button-Down Shirt',
        fabrication: '100% Cotton Oxford Weave (Non-Iron Finish)',
        weight: '140 - 175 GSM',
        features: 'Durable, breathable, distinctive "pointelle" or basket texture, structured collar, button-down front.',
        imagePlaceholder: 'Oxford Weave Construction',
        image: '/images/products/oxfordshirt.png'
      },
       {
        name: 'Heavyweight Brushed Flannel Shirt',
        fabrication: '100% Cotton Flannel (often woven with carded yarn)',
        weight: '180 - 220 GSM',
        features: 'Soft, raised napped surface that traps air for thermal insulation, classic yarn-dyed plaid pattern configurations.',
        imagePlaceholder: 'Brushed Flannel Weave',
        image: '/images/products/flannelshirt.png'
      },
      {
        name: 'Classic Casual Chino Pants',
        fabrication: '98% Cotton / 2% Elastane Stretch Twill',
        weight: '240 - 280 GSM',
        features: 'Smooth, mercerized surface finish, diagonal line texture, minimal shrinkage, highly resilient structure suitable for daily wear.',
        imagePlaceholder: 'Stretch Twill Weave',
        image: '/images/products/casualchino.png'
      },
      {
        name: 'Technical Windbreaker',
        fabrication: '100% Nylon Ripstop with DWR Coating',
        weight: '80 - 100 GSM',
        features: 'Water-repellent treatment, windproof laminations, taped construction.',
        imagePlaceholder: 'Technical Ripstop Weave',
        image: '/images/products/windbreaker.png'
      },
      {
        name: 'Heavy-Duty Canvas Tote Bag',
        fabrication: '100% Cotton Canvas or Duck Canvas',
        weight: '320-370 GSM',
        features: 'Heavy duty construction, spacious interior, durable handles.',
        imagePlaceholder: 'Canvas Tote Bag Construction',
        image: '/images/products/totebag.png'
      }
    ]
  },
  {
    id: 'denim',
    title: 'Denim & Heavy Wash',
    items: ['Jeans & Denim Trousers', 'Denim Jackets', 'Chambray Shirts', 'Heavy Washed Twill Wear'],
    capacity: '600,000 Pcs / Month',
    leadTime: '90 Days (with specialized wash)',
    moq: '2,500 Pcs per style',
    products: [
      {
        name: 'Authentic 5-PocketDenim Jeans',
        fabrication: '100% Cotton Denim (Rope-Dyed Indigo)',
        weight: '12 - 14 oz',
        features: 'Authentic edge construction, vintage-inspired 5-pocket design, sustainable rope-dyeing process.',
        imagePlaceholder: ' Denim Construction',
        image: '/images/products/denim.png'
      },
      {
        name: 'Classic Workwear Chambray Shirt',
        fabrication: '100% Cotton Chambray',
        weight: '5 - 7 oz',
        features: 'Characteristic colored warp (indigo) and white weft weave, double-needle chain stitch construction with run-off threads at the side hem, dual button-closure chest pockets, and a classic curved shirttail hem.',
        imagePlaceholder: 'Chambray Shirt Construction',
        image: '/images/products/chambrayshirt.png'
      },
      {
        name: 'Rugged Heavy Twill Overshirt',
        fabrication: '100% Cotton Heavy Twill (with vintage wash options)',
        weight: '6 - 8 oz',
        features: 'Durable twill weave with a diagonal rib pattern, vintage wash treatments for a worn-in look, reinforced seams for added durability.',
        imagePlaceholder: 'Heavy Twill Overshirt Construction',
        image: '/images/products/heavytwilshirt.png'
      },
      {
        name: 'Vintage Distressed Trucker Jacket',
        fabrication: '100% Cotton Denim with Eco-Friendly Stonewash',
        weight: '12 - 14 oz',
        features: 'Vintage distressing, eco-friendly stonewash processing, durable construction.',
        imagePlaceholder: 'Distressed Denim Jacket Construction',
        image: '/images/products/truckerjacket.png'
      }
    ]
  },
  {
    id: 'intimates',
    title: 'Intimate Apparel',
    items: ['Underwear', 'Sleepwear', 'Lingerie', 'Shapewear'],
    capacity: '1,000,000 Pcs / Month',
    leadTime: '60-75 Days',
    moq: '3,000 Pcs per style',
    products: [
      {
        name: 'Seamless Microfiber Briefs',
        fabrication: '92% Nylon / 8% Spandex Blended Interlock',
        weight: '160 - 180 GSM',
        features: 'Laser-cut edges, tagless comfort panel, moisture-wicking gusset.',
        imagePlaceholder: 'Seamless Microfiber',
        image: '/images/products/briefs.png'
      }
    ]
  }
];