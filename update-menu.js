const fs = require('fs');

// Read the menu file
const menuPath = 'C:\\Users\\vadim\\Desktop\\Pizzeria Daniel\\daniel.itkamianets.com\\menu_backup.json';
const menu = JSON.parse(fs.readFileSync(menuPath, 'utf-8'));

// Pizza categorization
const pizzaCategories = {
  classic: ['margherita', 'diavola', 'capriciosa', 'contadino', 'calzone', 'schicciata', 'oliva', 'chorizo', 'funghi-cipolla', 'salami', 'prosciutto', 'tropea'],
  meat: ['ferara', 'seba', 'pollo', 'ricca', 'sancho', 'porchetta', 'vitello', 'positano', 'mortadella', 'mamma-mia', 'quattro-staggione'],
  fish: ['saraceno', 'frutti-di-mare-63', 'daniel', 'tonno-cipolla', 'verona'],
  cheese: ['quattro-formaggi'],
  special: ['stracciatella-863', 'fantasia', 'anetta', 'molfetta', 'luciano', 'trufaldino']
};

// Find the pizza category
const pizzaCategory = menu.categories.find(c => c.name.uk === 'ПІЦА');
if (pizzaCategory) {
  const products = pizzaCategory.products;
  
  pizzaCategory.subcategories = [
    {
      name: { uk: 'Класичні', en: 'Classic' },
      products: products.filter(p => pizzaCategories.classic.includes(p.slug))
    },
    {
      name: { uk: "М'ясні", en: 'Meat' },
      products: products.filter(p => pizzaCategories.meat.includes(p.slug))
    },
    {
      name: { uk: 'Рибні', en: 'Fish/Seafood' },
      products: products.filter(p => pizzaCategories.fish.includes(p.slug))
    },
    {
      name: { uk: 'Сирні', en: 'Cheese' },
      products: products.filter(p => pizzaCategories.cheese.includes(p.slug))
    },
    {
      name: { uk: 'Авторські', en: "Chef's Special" },
      products: products.filter(p => pizzaCategories.special.includes(p.slug))
    }
  ];
  
  delete pizzaCategory.products;
  console.log('Pizza category updated with subcategories');
}

// Find the desserts category
const dessertsCategory = menu.categories.find(c => c.name.uk === 'ДЕСЕРТИ');
if (dessertsCategory) {
  const products = dessertsCategory.products;
  
  // Categorize desserts
  const iceCreamSlugs = products
    .filter(p => p.slug.includes('morozivo'))
    .map(p => p.slug);
  
  const pastrySlugs = products
    .filter(p => 
      p.slug.includes('kruasan') || 
      p.slug.includes('ponchik') || 
      p.slug.includes('donut') ||
      p.slug.includes('ekler') ||
      p.slug.includes('shu') ||
      p.slug.includes('macarons') ||
      p.slug.includes('kapkeyk')
    )
    .map(p => p.slug);
  
  // Sweet desserts are everything else (cakes, tiramisu, panna cotta, etc.)
  const sweetDessertSlugs = products
    .filter(p => 
      !iceCreamSlugs.includes(p.slug) && 
      !pastrySlugs.includes(p.slug)
    )
    .map(p => p.slug);
  
  dessertsCategory.subcategories = [
    {
      name: { uk: 'Солодкі десерти', en: 'Sweet Desserts' },
      products: products.filter(p => sweetDessertSlugs.includes(p.slug))
    },
    {
      name: { uk: 'Морозиво', en: 'Ice Cream' },
      products: products.filter(p => iceCreamSlugs.includes(p.slug))
    },
    {
      name: { uk: 'Випічка', en: 'Pastries' },
      products: products.filter(p => pastrySlugs.includes(p.slug))
    }
  ];
  
  delete dessertsCategory.products;
  console.log('Desserts category updated with subcategories');
}

// Find the add-ons category
const addOnsCategory = menu.categories.find(c => c.name.uk === 'ДОДАТКИ');
if (addOnsCategory) {
  const products = addOnsCategory.products;
  
  // All current items are sauces
  addOnsCategory.subcategories = [
    {
      name: { uk: 'Соуси', en: 'Sauces' },
      products: products
    },
    {
      name: { uk: 'Напої', en: 'Drinks' },
      products: []
    },
    {
      name: { uk: 'Хліб', en: 'Bread' },
      products: []
    },
    {
      name: { uk: 'Кондитерські вироби', en: 'Confectionery' },
      products: []
    }
  ];
  
  delete addOnsCategory.products;
  console.log('Add-ons category updated with subcategories');
}

// Write the updated menu
const outputPath = 'C:\\Users\\vadim\\Desktop\\Pizzeria Daniel\\daniel.itkamianets.com\\menu.json';
fs.writeFileSync(outputPath, JSON.stringify(menu, null, 2), 'utf-8');
console.log('Menu updated successfully!');
console.log('Output saved to:', outputPath);
