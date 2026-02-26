export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Notebooks' | 'Pens' | 'Inks' | 'Accessories';
  description: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Hand-Bound Linen Journal',
    price: 32.00,
    category: 'Notebooks',
    description: '160 pages of 120gsm acid-free paper, perfect for fountain pens.',
    image: 'https://picsum.photos/seed/journal/800/1000'
  },
  {
    id: '2',
    name: 'Brass Fountain Pen',
    price: 85.00,
    category: 'Pens',
    description: 'A solid brass body that develops a unique patina over time.',
    image: 'https://picsum.photos/seed/pen/800/1000'
  },
  {
    id: '3',
    name: 'Midnight Blue Gall Ink',
    price: 18.00,
    category: 'Inks',
    description: 'Traditional iron gall ink with deep shading and water resistance.',
    image: 'https://picsum.photos/seed/ink/800/1000'
  },
  {
    id: '4',
    name: 'Walnut Desk Organizer',
    price: 120.00,
    category: 'Accessories',
    description: 'Carved from a single block of American Walnut.',
    image: 'https://picsum.photos/seed/desk/800/1000'
  },
  {
    id: '5',
    name: 'Cotton Paper Envelopes',
    price: 15.00,
    category: 'Accessories',
    description: 'Set of 20 deckle-edged envelopes made from 100% cotton.',
    image: 'https://picsum.photos/seed/envelopes/800/1000'
  },
  {
    id: '6',
    name: 'Glass Dipping Pen',
    price: 45.00,
    category: 'Pens',
    description: 'Hand-blown glass pen for testing inks and calligraphy.',
    image: 'https://picsum.photos/seed/glasspen/800/1000'
  }
];
