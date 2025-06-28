// Fetch product images from Unsplash API
const fetchProductImages = async (query, count = 1) => {
  try {
    // Using the Unsplash API through a proxy to avoid API key requirements
    const response = await fetch(
      `https://source.unsplash.com/featured/?${encodeURIComponent(query)}`
    );

    if (response.ok) {
      return response.url;
    }
    return null;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};

// Pre-defined agriculture product image URLs to avoid rate limiting
const productImageMap = {
  // Seeds
  "rice-seeds":
    "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  "tomato-seeds":
    "https://images.unsplash.com/photo-1592921870789-04563d55041c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  "wheat-seeds":
    "https://images.unsplash.com/photo-1535912591050-4c2778577d0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",

  // Fertilizers
  "npk-fertilizer":
    "https://images.unsplash.com/photo-1601275225755-6451883282a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  vermicompost:
    "https://images.unsplash.com/photo-1553787434-dd9eb4ea4d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  "neem-cake":
    "https://images.unsplash.com/photo-1572402123736-c79526db405a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",

  // Tools & Equipment
  cultivator:
    "https://images.unsplash.com/photo-1598599226318-225c94871b27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  "solar-pump":
    "https://images.unsplash.com/photo-1612197527762-8cfb55b618d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  "drip-irrigation":
    "https://images.unsplash.com/photo-1590323546002-e9348b4397f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",

  // Pesticides
  "neem-oil":
    "https://images.unsplash.com/photo-1616876195047-605c2b5b9b9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  "bio-fungicide":
    "https://images.unsplash.com/photo-1585004607620-fb4c47505f5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  "insect-traps":
    "https://images.unsplash.com/photo-1572054466274-947d79a56422?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",

  // Harvested Crops
  "basmati-rice":
    "https://images.unsplash.com/photo-1516824600626-47a22f894afd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  "vegetable-box":
    "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  "wheat-flour":
    "https://images.unsplash.com/photo-1568097269865-2a5fa1d4ca03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
};

/**
 * Utility function to get product image URL
 * If product has an image URL, it returns that.
 * Otherwise, it returns a placeholder image URL.
 *
 * @param {Object} product - The product object
 * @returns {string} The image URL
 */
export const getProductImageUrl = (product) => {
  if (!product) return "https://via.placeholder.com/300x180?text=Product+Image";

  // Use the image from the product, or try to find it in the predefined map
  return (
    product.image ||
    productImageMap[product.id] ||
    "https://via.placeholder.com/300x180?text=Product+Image"
  );
};

/**
 * Get a placeholder image for a specific product category
 *
 * @param {string} category - The product category
 * @returns {string} The category-specific placeholder image URL
 */
export const getCategoryPlaceholderImage = (category) => {
  const placeholders = {
    seeds:
      "https://images.unsplash.com/photo-1618390392492-8fd2ad18e78b?w=800&auto=format&fit=crop",
    fertilizers:
      "https://images.unsplash.com/photo-1592998644766-10e0bf11cebd?w=800&auto=format&fit=crop",
    tools:
      "https://images.unsplash.com/photo-1601907473246-c938abf6d7b3?w=800&auto=format&fit=crop",
    pesticides:
      "https://images.unsplash.com/photo-1536781607226-ba3dfb1e7e3a?w=800&auto=format&fit=crop",
    harvested:
      "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&auto=format&fit=crop",
  };

  return (
    placeholders[category] ||
    "https://via.placeholder.com/300x180?text=Product+Image"
  );
};

export { fetchProductImages };
