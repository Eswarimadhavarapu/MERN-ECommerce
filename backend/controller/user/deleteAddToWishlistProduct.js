const addToWishlistModel = require("../../models/wishlistProduct");

const deleteAddTowishlistProduct = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const addToWishlistProductId = req.body._id;

    const deleteProduct = await addToWishlistModel.deleteOne({
      _id: addToWishlistProductId,
    });

    res.json({
      message: "Product Deleted From Cart",
      error: false,
      success: true,
      data: deleteProduct,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = deleteAddTowishlistProduct;
