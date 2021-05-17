//dom 

const app =document.querySelector('#app');
const userName =document.querySelector('#username');
const password =document.querySelector('#password');
const submit =document.querySelector('#submit');
//api
const url ='https://vue3-course-api.hexschool.io/';
const path ="shang";


//data

console.clear();
 submit.addEventListener("click",(e)=>{ 
   e.preventDefault();
   let user ={
     username:userName.value,
     password:password.value
}  ;      
     //post發出登入請求
    axios.post(`${url}admin/signin`,user).then((res)=>{
     //儲存token與expire
      let token =res.data.token;
      let expired = res.data.expired;      
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;    
      //取得cookie內的token
      render();
   })

   
 });

 function render(){
   const tableline = document.querySelector("#productList") ;  
     //如果tableline未渲染
       if(!tableline){
            //重新渲染
        let str =` <table class="table mt-4">
           <thead>
             <tr>
               <th>產品名稱</th>
               <th width="120">
                 原價
               </th>
              <th width="120">
                 售價
               </th>
               <th width="150">
                 是否啟用
               </th>
               <th width="120">
                 刪除
               </th>
             </tr>
           </thead>
           <tbody id="productList">
           
           </tbody>
         </table>
         <p>目前有 <span id="productCount">0</span> 項產品</p>               
          <button id="addNew">新增產品</button>`;
         app.innerHTML =str;

       }

      
   //取得cookie內的token，設定到header中
      token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"); 
      axios.defaults.headers.common.Authorization = token;
      //發出請求，取得商品資料
        axios.get(`${url}api/${path}/admin/products`).then(res=>{
          let products = res.data.products;
          
      let str2='';     
     const tableline = document.querySelector("#productList") ;
     const productCount=document.querySelector("#productCount") ;
     
     //組資料中的各個商品列html    
    products.forEach(item => {
        str2 += ` <tr>
              <td>${item.title}</td>
              <td width="120">
                ${item.origin_price}
              </td>
              <td width="120">
                ${item.price}
              </td>
              <td width="100">
                <span class="">${item.is_enabled?"啟用":"未啟用"}</span>
              </td>
              <td width="120">
                <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id="${item.id}"> 刪除 </button>
              </td>
            </tr>`
      });
      //統計總商品數字
      productCount.textContent =products.length;
      tableline.innerHTML =str2;
      //綁定render的dom
       const addNew = document.querySelector("#addNew") ;
        
      
       //監聽剛render的dom
        addNew.addEventListener('click',addNewProduct)
        tableline.addEventListener('click',deleteProduct)
        })

    
 } 

 //新增
 function addNewProduct(){
    //取得cookie內的token
    let  token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"); 
    axios.defaults.headers.common.Authorization = token;
      //預設新增產品資料
        const product = {
          data: {
            title: "[賣]動物園造型衣服4",
            category: "衣服2",
            origin_price: 100,
            price: 300,
            unit: "個",
            description: "Sit down please 名設計師設計",
            content: "這是內容",
            is_enabled: 0,
            imageUrl:
              "https://images.unsplash.com/photo-1573662012516-5cb4399006e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
          },
        };

        // #6 新增一個產品
       axios.post(`${url}api/${path}/admin/product`,product).then(res=>{
         //重新渲染新的產品列
         render()
       })


 }

 //刪除
 function deleteProduct(e){
   let deleteBtn =e.target;
 
  //鎖定deletebtn
   if( deleteBtn.getAttribute("class").includes("deleteBtn") ){
     let productId =deleteBtn.dataset.id;
     //發出delete請求
     axios.delete(`${url}api/${path}/admin/product/${productId}`).then(res=>{
       //重新渲染結果
       render();
     })
   }
 
 }
