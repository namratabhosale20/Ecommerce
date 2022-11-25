let shop = document.getElementById('shop');
console.log(shop)
// let ShopItemData = [
//     {
//         id: "kjvkdjvd",
//         name: "Causal shirt",
//         price: 45,
//         desc: "lorem fkff fgbgf erf",
//         Img: "https://i.pinimg.com/originals/fc/32/58/fc3258b666e68f9ba7595f87b5c035ef.png"
//     },
//     {
//         id: "djkjfdkf",
//         name: "office shirt shirt",
//         price: 100,
//         desc: "lorem fkff fgbgf erf",
//         Img: "https://i5.walmartimages.com/asr/c0246029-47f4-4e5f-a636-a3648bce7dc4.8f9ebbfcf7468ae6f7b5785896ba7ec2.jpeg"
//     },
//     {
//         id: "jdjijdf",
//         name: "Tshirt",
//         price: 250,
//         desc: "lorem fkff fgbgf erf",
//         Img: "https://s3.amazonaws.com/images.ecwid.com/images/23401079/1276317004.jpg "
//     },
//     {
//         id: "djhfhh",
//         name: "Tshirt",
//         price: 450,
//         desc: "lorem fkff fgbgf erf",
//         Img: "https://gildan.my/wp-content/uploads/2020/02/76000B-24C-Gold.png"
//     }]

// let basket = [];
let basket = JSON.parse(localStorage.getItem("data")) || [];
let generateShop = () => {
    return (shop.innerHTML = ShopItemData.map((X) => {
        let { id, name, price, desc, Img } = X;
        let search = basket.find((X)=> X.id === id) || []
return ` 
            <div id=product-id-${id} class="item">
        <img src=${Img} width="220px" alt="">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}.</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="fa fa-minus" aria-hidden="true"></i>
                    <div id=${id} class="quantity">
                    ${search.item===undefined? 0: search.item}</div>
                    <i onclick="increment(${id})" class="fa fa-plus" aria-hidden="true"></i>
                   
                </div>
            </div>
        </div>
    </div>
    `;
    }).join(""));
}
generateShop();

let increment = (id) => {
    let selecteditem = id;
    let search = basket.find((X) => X.id === selecteditem.id);

    if (search === undefined) {

        basket.push({
            id: selecteditem.id,
            item: 1,
        });
    }
    else {
        search.item += 1;
    }
    localStorage.setItem("data", JSON.stringify(basket));
    // console.log(basket);
    update(selecteditem.id);
};



let decrement = (id) => {
    let selecteditem = id;
    let search = basket.find((X) => X.id === selecteditem.id);

    if(search===undefined)return

    else if (search.item === 0) return;

    else {
        search.item -= 1;
    }
    update(selecteditem.id);
    basket=basket.filter((X)=>X.item!==0);
    // console.log(basket);
    
    localStorage.setItem("data", JSON.stringify(basket));
}

let update = (id) => {
    let search = basket.find((X) => X.id === id);
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
}

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = (basket.map((X) => X.item).reduce((X, y) => X + y, 0));
}
calculation();