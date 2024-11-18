let globalApidata = [];
const api = async () => {
  fetch("https://mocki.io/v1/305b9ede-a357-475c-aeea-80cbdb95f3e6")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      maincontainer(res);
      genderAccess(res);

      globalApidata = res;
      brandlist(res);
    })

    .catch((err) => {
      console.log("error");
    });
};
api();

const maincontainer = (products) => {
  // console.log(products)
  const perviousdiv = document.getElementById("container");
  perviousdiv.innerHTML = "";
  products.forEach((product) => {
    const newperviousdiv = document.createElement("div");
    newperviousdiv.innerHTML = `<img src=${product.img} alt="" />
          <p>4.5 |⭐2.1k</p>
          <h5>${product.brand_name}</h5>
          <p>${product.name}</p>
          <p>Rs.${product.price} <strike>Rs.${product.oldprice}</strike>(${product.discount}% OFF)</p>`;
    newperviousdiv.setAttribute("class", "cardItem");
    perviousdiv.append(newperviousdiv);
  });
};

const genderAccess = (products) => {
  const mapgenedr = products.map((product) => {
    return product.gender;
  });
  //  console.log(mapgenedr);
  [...new Set(mapgenedr)].forEach((productgen) => {
    // console.log(productgen);
    const creategenderdiv = document.createElement("div");
    creategenderdiv.innerHTML = ` <input type="radio" id=${productgen} name="Gender" value=${productgen}>
        <label for=${productgen}>${productgen}</label></br>`;
    creategenderdiv.setAttribute("onclick", "onclickgender()");
    genderCard.append(creategenderdiv);
  });
};

const onclickgender = () => {
  const arrayofgenderinputs = document.getElementsByName("Gender");
  console.log(arrayofgenderinputs);

  arrayofgenderinputs.forEach((objectOfgenderinput) => {
    // console.log(objectOfgenderinput)

    if (objectOfgenderinput.checked) {
      console.log(objectOfgenderinput.value);

      const filteredGlobalarray = globalApidata.filter((filtergender) => {
        return filtergender.gender == objectOfgenderinput.value;
      });
      const forfreegendernewConatiner = document.getElementById("container");
      forfreegendernewConatiner.innerHTML = " ";
      filteredGlobalarray.forEach((product) => {
        const creatednewdivforgender = document.createElement("div");
        creatednewdivforgender.innerHTML = `<img src=${product.img} alt="" />
          <p>4.5 |⭐2.1k</p>
          <h5>${product.brand_name}</h5>
          <p>${product.name}</p>
          <p>Rs.${product.price} <strike>Rs.${product.oldprice}</strike>(${product.discount}% OFF)</p>`;
        creatednewdivforgender.setAttribute("class", "cardItem");
        forfreegendernewConatiner.append(creatednewdivforgender);
      });
    }
    //  console.log(filteredGlobalarray);
  });
};

const brandlist = (brandproducts) => {
  // arr = [1, 11, 1, 2, 3, 1, 23, 4, 3, 2]
  // arr = [{ num: 1 }, { num: 1 }, { num: 1 }, { num: 1 }, { num: 1 },]

  // console.log(arr);
  const filterbrandlist = brandproducts.map((brandproduct) => {
    return brandproduct.brand_name;
  });
  // console.log(filterbrandlist);

  [...new Set(filterbrandlist)].forEach((product) => {
    // console.log(product)
    const creatednewdivForbrand = document.createElement("div");
    creatednewdivForbrand.innerHTML = `<input type="checkbox" id=${product} name="Brands" value=${product}>
        <label for=${product}>${product}</label></br>`;
    creatednewdivForbrand.setAttribute("onclick", "onclickBrand()");
    brandCard.append(creatednewdivForbrand);
  });
};

const onclickBrand = () => {
  const newArray = [];
  const filteredArr = [];
  const arrAccessbrandcardToselect = document.getElementsByName("Brands");
  console.log(arrAccessbrandcardToselect);

  arrAccessbrandcardToselect.forEach((objectbrandstoselect) => {
    if (objectbrandstoselect.checked) {
      newArray.push(objectbrandstoselect.value);
      // console.log(objectbrandstoselect.value.split(" "))
    }
    console.log(newArray);
  });

  newArray.forEach((arrNewvalue) => {
    console.log(arrNewvalue);
    const filteredfornewarrVlue = globalApidata.forEach(
      (filterdglobalabrandvalue) => {
        //  console.log(filterdglobalabrandvalue.brand_name)
        if (splitStr(filterdglobalabrandvalue.brand_name) == arrNewvalue) {
          filteredArr.push(filterdglobalabrandvalue);
          //  console.log(filterdglobalabrandvalarrNewvalueue)
        }
        const forbrandshow = document.getElementById("container");
        forbrandshow.innerHTML = "";
        filteredArr.forEach((iteratedfilterArry) => {
          const newdivforbrands = document.createElement("div");
          newdivforbrands.innerHTML = `<img src=${iteratedfilterArry.img} alt="" />
            <p>4.5 |⭐2.1k</p>
            <h5>${iteratedfilterArry.brand_name}</h5>
            <p>${iteratedfilterArry.name}</p>
            <p>Rs.${iteratedfilterArry.price} <strike>Rs.${iteratedfilterArry.oldprice}</strike>(${iteratedfilterArry.discount}% OFF)</p>`;
          newdivforbrands.setAttribute("class", "cardItem");
          forbrandshow.append(newdivforbrands);
        });
      }
    );
  });
  if (newArray.length == 0) {
    // console.log('khali')
    const divcontainerempty = document.getElementById("container");
    divcontainerempty.innerHTML = " ";
    const redeclaredglobalaDta = globalApidata.forEach(
      (redeclaredglobalaDta) => {
        const newdivforbrands = document.createElement("div");
        newdivforbrands.innerHTML = `<img src=${redeclaredglobalaDta.img} alt="" />
                  <p>4.5 |⭐2.1k</p>
                  <h5>${redeclaredglobalaDta.brand_name}</h5>
                  <p>${redeclaredglobalaDta.name}</p>
                  <p>Rs.${redeclaredglobalaDta.price} <strike>Rs.${redeclaredglobalaDta.oldprice}</strike>(${redeclaredglobalaDta.discount}% OFF)</p>`;
        newdivforbrands.setAttribute("class", "cardItem");
        divcontainerempty.append(newdivforbrands);
      }
    );
  }
};

const search = (event) => {
  console.log(event.target.value);
  // const forfreesearchnewCntainer =document.getElementById('container')
  // forfreesearchnewCntainer.innerHTML =" ";

  const filteredforSearch = globalApidata.filter((globaldataobject) => {
    return globaldataobject.name
      .toLowerCase()
      .includes(event.target.value.toLowerCase()) || globaldataobject.brand_name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());;
  });
  const forfreesearchnewCntainer = document.getElementById("container");
  forfreesearchnewCntainer.innerHTML = " ";

  filteredforSearch.forEach((iteratedsearch) => {
    const forsearchvalue = document.createElement("div");
    forsearchvalue.innerHTML = `<img src=${iteratedsearch.img} alt="" />
             <p>4.5 |⭐2.1k</p>
             <h5>${iteratedsearch.brand_name}</h5>
             <p>${iteratedsearch.name}</p>
             <p>Rs.${iteratedsearch.price} <strike>Rs.${iteratedsearch.oldprice}</strike>(${iteratedsearch.discount}% OFF)</p>`;
    forsearchvalue.setAttribute("class", "cardItem");
    forfreesearchnewCntainer.append(forsearchvalue);
  });

  //  const forsearchvalue = document.createElement('div')
  //  forsearchvalue.innerHTML =`<img src=${globaldataobject.img} alt="" />
  //             <p>4.5 |⭐2.1k</p>
  //             <h5>${globaldataobject.brand_name}</h5>
  //             <p>${globaldataobject.name}</p>
  //             <p>Rs.${globaldataobject.price} <strike>Rs.${globaldataobject.oldprice}</strike>(${globaldataobject.discount}% OFF)</p>`

  // })
  console.log('filteredforSearch', filteredforSearch, event.target.value);

   if (filteredforSearch.length == 0) {
   const forfreesearchnewCntainer = document.getElementById("container");
   forfreesearchnewCntainer.innerHTML = " <h3>This Product is not Found</h3>";
   }
};

const splitStr = (str) => {
  if (str.includes(" ")) {
    return str.split(" ")[0];
  }
  return str;
};
