const mockData = [
  { id: 1, name: "Sushi Roll", description: "Classic sushi roll with fresh fish", price: 150, ingredients: ["fish", "rice", "seaweed"], image: "https://via.placeholder.com/150" },
  { id: 2, name: "Tempura", description: "Crispy fried shrimp tempura", price: 200, ingredients: ["shrimp", "flour", "oil"], image: "https://via.placeholder.com/150" },
];

export const fetchMenu = async () => {
  return mockData;
};
