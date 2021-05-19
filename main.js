//dom 

const viewBoard =document.querySelector('#app');

const submit =document.querySelector('#submit');
//api
const url ='https://vue3-course-api.hexschool.io/';
const path ="shang";


//data


 submit.addEventListener("click",login);

 function login(){
   const username =document.querySelector('#username').value;
   const password =document.querySelector('#password').value;
   let user ={
     username,
     password
    }  ;     
     //post發出登入請求
    axios.post(`${url}admin/signin`,user).then((res)=>{
         if (res.data.success) {
            const { token, expired } = res.data;            
            document.cookie = `hexToken=${token};expires=${new Date(expired)}`;
            //初始化後台頁面
             app.init();
          }
          //帳號錯誤
          else{
            alert("你的帳號錯誤窩窩")
          }
    
      
    
   }) 
 
 }
const app = {
  data:{
     products: [],
  },
  getProducts(){
    axios.get(`${url}api/${path}/admin/products`).then(res=>{
     
      //把取得的data放進products
     this.products = res.data.products;
     this.render();
  
        })

  },
   //新增
 addNewProduct(){
    
      //預設新增產品資料
        const product = {
          data: {
            title: "[賣]動物園造型衣服5",
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
       app.getProducts();
       })


 },
  deleteProduct(e){
   let deleteBtn =e.target;
 
  //鎖定deletebtn
   if( deleteBtn.getAttribute("class").includes("deleteBtn") ){
     let productId =deleteBtn.dataset.id;
     //發出delete請求
     axios.delete(`${url}api/${path}/admin/product/${productId}`).then(res=>{
      
      app.getProducts();

      
     })
   }
 
 },
  init(){   
    
     //取得cookie內的token

     const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"); 
      if(token){
             //重新渲染成後台產品檢視模式
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
         viewBoard.innerHTML =str;
         //監聽新增事件
        addNew.addEventListener('click',this.addNewProduct);
     
     //取得產品列表
       //將token夾帶進axios的header中
        axios.defaults.headers.common.Authorization = token;
      this.getProducts()
      }
      
   
      
      
    
  },
  render(){
        let str2='';     
     const tableline = document.querySelector("#productList") ;
     const productCount=document.querySelector("#productCount") ;
     
     //組資料中的各個商品列html    
    this.products.forEach(item => {
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
      productCount.textContent =this.products.length;
      tableline.innerHTML =str2;
     
      //監聽delete事件
        tableline.addEventListener('click',this.deleteProduct)
  }
};



//驗證是否已是登入狀況
app.init()


 //刪除

