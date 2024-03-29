﻿using System.Collections.Generic;
using System.Threading.Tasks;
using eCommerce.Interfaces;
using eCommerce.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eCommerce.Controllers
{
    [Route("api/[controller]")]
    public class WishlistController : Controller
    {
        readonly IWishlistService _wishlistService;
        readonly IProductService _productService;
        readonly IUserService _userService;

        public WishlistController(IWishlistService wishlistService, IProductService productService, IUserService userService)
        {
            _wishlistService = wishlistService;
            _productService = productService;
            _userService = userService;
        }

        /// <summary>
        /// Get the list of items in the Wishlist
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>All the items in the Wishlist</returns>
        [HttpGet("{userId}")]
        public async Task<List<Product>> Get(int userId)
        {
            return await Task.FromResult(GetUserWishlist(userId)).ConfigureAwait(true);
        }

        /// <summary>
        /// Toggle the items in Wishlist. If item doesn't exists, it will be added to the Wishlist else it will be removed.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="productId"></param>
        /// <returns>All the items in the Wishlist</returns>
        //[Authorize]
        [HttpPost]
        [Route("ToggleWishlist/{userId}/{productId}")]
        public async Task<List<Product>> Post(int userId, int productId)
        {
            _wishlistService.ToggleWishlistItem(userId, productId);
            return await Task.FromResult(GetUserWishlist(userId)).ConfigureAwait(true);
        }

        /// <summary>
        /// Clear the Wishlist
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        ////[Authorize]
        [HttpDelete("{userId}")]
        public int Delete(int userId)
        {
            return _wishlistService.ClearWishlist(userId);
        }

        List<Product> GetUserWishlist(int userId)
        {
            bool user = _userService.isUserExists(userId);
            if (user)
            {
                string Wishlistid = _wishlistService.GetWishlistId(userId);
                return _productService.GetProductsAvailableInWishlist(Wishlistid);
            }
            else
            {
                return new List<Product>();
            }

        }
    }
}
