const categoryContainer = document.getElementById('category-container');
 const middleTree = document.getElementById("middle-tree");


 const cartCount = document.getElementById("cartItemCount")
const loadAllTree = ()=>{
    
    fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data =>{
    displayPlant(data.plants)

    });
    
}
const loadCategory = ()=>{
   
    fetch("https://openapi.programming-hero.com/api/categories")

    .then((res) => res.json())
    .then((data) => {
const categories = data.categories;

showCategory(categories);

})
    .catch(error => console.log(error));
   
};
 
loadCategory();
const showCategory = (categories)=>{

    categories.forEach(cat => {
       
    categoryContainer.innerHTML += `<li onClick = "loadPlantByCat(${cat.id})"><button  class=" text-[gray]
     font-semibold bg-[#F0FDF4] hover:bg-[green] text-[12px]
    hover:text-white mb-1 p-2 rounded-lg cursor-pointer border-1 w-full">${cat.category_name}</button></li>`;
});
    categoryContainer.addEventListener('click',(e)=>{
        const allBtn = document.querySelectorAll("button");
        showLoading();
        allBtn.forEach(button => {
            button.classList.remove("bg-green-600", "text-white")
        });
        if(e.target.localName === 'button'){
           
            e.target.classList.add("bg-green-600", "text-white")
            }
        });
};

const loadPlantByCat = (plantId)=>{

    const url = `https://openapi.programming-hero.com/api/category/${plantId}`;
    showLoading()
        console.log(url)
    fetch(url)
    .then (res =>res.json())
    .then(data =>{
        displayPlant(data.plants)
    })
    .catch (err =>{
        console.log(err)
    })
} 
const loadPlantDetail = async(id)=>{
    const url=`https://openapi.programming-hero.com/api/plant/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayTreeDetails(details.plants);
    
};
const displayTreeDetails = (tree)=>{
    
 console.log(tree);
 const modalBox = document.getElementById("modalName");
    modalBox.innerHTML =` 
    <h4 id ='' class="font-bold text-[1.5rem]">${tree.name}</h4>
    <img src="${tree.image}" alt="" class="w-full h-[200px] object-cover mb-2 rounded-lg" />
      <div class="flex  justify-between items-center my-2">
        
        <p class="text-[1rem] text-[#15803D] p-2 bg-[#DCFCE7] rounded-lg"><span class = 'font-bold'>Category :</span> ${tree.category}</p>
       
        <p class="font-bold"><span class = 'font-bold'> Price:</span> ৳<span>${tree.price}</span></p>
        </div>
      <p class = '  '><span class = 'font-bold'> Description:</span> ${tree.description}</p>
    
        
        <div class="modal-action">
     <form method="dialog">
         
        <button class="btn bg-[green] text-white">Close</button>
      </form>
        </div>
      `;
 document.getElementById("modalTree").showModal();
 
}

const displayPlant = (trees)=>{
   
    middleTree.innerHTML = ''
    trees.forEach(tree =>{
        
        const card = document.createElement("div")
        card.innerHTML=`<div id="${tree.id}" class="tree-card p-4 rounded-lg bg-[#ffffff]  w-full shadow-lg">
      <img src="${tree.image}" alt="" class="w-full h-[200px] object-cover mb-2 rounded-lg" />
      <h4 onclick="loadPlantDetail(${tree.id})" class="font-bold text-[1.5rem] cursor-pointer">${tree.name}</h4>
      <p class = 'overflow-hidden  line-clamp-3'>${tree.description}</p>
      <div class="flex justify-between items-center my-2">
        <div>
        <p class="text-[1rem] text-[#15803D] p-2 bg-[#DCFCE7] rounded-lg">${tree.category}</p>
        </div>
        <div>
        <p class="font-bold">৳<span>${tree.price}</span></p>
        </div>

        
      </div>
      <button class="rounded-[50px] bg-[#15803D] text-white p-2 cursor-pointer w-full">Add to Cart</button>
    </div>`
        middleTree.append(card)
        });
    }

loadAllTree()
const cartTree = document.getElementById("right-tree");
let yourCarts = [];
middleTree.addEventListener("click",(e)=>{
   
    if(e.target.innerText === "Add to Cart"){
        handleCarts(e)
       
    }
})
const handleCarts = (e)=>{
    
        const cartTitle = e.target.parentNode.children[1].innerText;
    
        const cartId = e.target.parentNode.id;
        
        const teePrice = e.target.parentNode.children[3].innerText;
        
        const plantPrice = parseFloat(teePrice.replace(/[^0-9.]/g, '')) 
        
        
        yourCarts.push({
            cartId :cartId ,
            cartTitle:cartTitle,
            plantPrice:plantPrice

        })
        alert(`${cartTitle} has been add to cart`);
        showCartItem(yourCarts)
        
}
const showCartItem = (yourCarts)=>{
    cartTree.innerHTML = "";
    let totalPrice = 0;
    yourCarts.forEach(yourCart =>{
       
    totalPrice += yourCart.plantPrice; 

        cartTree.innerHTML += `
        <div class="flex justify-between mb-3 items-center bg-green-200 px-4 ">
      <div>
        <h2 class ="font-bold text-[12px] sm:text-[16px]">${yourCart.cartTitle}</h2>
        <p class ="font-bold text-[12px] sm:text-[16px]">৳<span>${yourCart.plantPrice} </p>
      </div>
       <i class="fa-solid fa-trash text-black-500 cursor-pointer text-[12px] sm:text-[16px]"
               onclick="handleCartItem('${yourCart.cartId}')"></i></div>
    
        `
        })
    document.getElementById("cartAllPrice").innerText = `${totalPrice}`
}
const handleCartItem = (itemId) => {
    const filterCartId = yourCarts.filter(yourCart => yourCart.cartId !== itemId)
    yourCarts = filterCartId;
    showCartItem(yourCarts);
    }
const loadingDa = document.getElementById("loadingDa")
const showLoading = () =>{
     middleTree.innerHTML = `<div class = "text-center   justify-center"><span class=" loading loading-dots loading-sm"></span></div>`;
}