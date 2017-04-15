/**
 * Created by lzb on 17/3/1.
 */

window.vm = new Vue({
	el:'#app',
	data:{
		showModal:false,
		productList:[],
		totalMoney:0,
		checkAll:false,
		currentProduct:'',
		productStatus: '购物车空空如也！',
	},
	mounted: function () {
		var _this = this;
		this.cartView();
	},
	filters: {
		formatMoney: function (value,quentity) {
			if(!quentity)quentity=1;
			return "¥ "+(value*quentity).toFixed(2) +"元";
		}
	},
	methods:{
		cartView: function () {
			this.$http.get("data/cartData.json").then(response=>{
				var res = response.data;
				if(res && res.status=="1"){
					this.productList = res.result.list;
					this.calcTotalMoney();
				}
			});
		},
		selectAll: function (isCheck) {
			this.checkAll=isCheck;
			this.productList.forEach(function (item) {
				if(typeof item.checked == "undefined"){
					Vue.set(item,"checked",isCheck);
				}else{
					item.checked = isCheck;
				}
			})
			this.calcTotalMoney();
		},
		selectedProduct: function (product) {
			if(typeof product.checked == "undefined"){
				this.$set(product,"checked",true);
			}else{
				product.checked = !product.checked;
			}
			this.calcTotalMoney();
			this.isCheckAll();
		},
		isCheckAll: function () {
			var flag = true;
			this.productList.forEach(function (item) {
				if(!item.checked){
					flag = false;
				}
			})
			if(flag){
				this.checkAll = true;
			}else{
				this.checkAll = false;
			}

		},
		calcTotalMoney: function () {
			var totalMoney = 0;
			this.productList.forEach(function (item) {
				if(item.checked){
					totalMoney+=item.productPrice*item.productQuentity;
				}
			});
			this.totalMoney = totalMoney;
		},
		changeMoney: function (product,way) {
			if(way>0){
				product.productQuentity++;
			}else{
				product.productQuentity--;
				if(product.productQuentity<0){
					product.productQuentity=0;
				}
			}
			this.calcTotalMoney();
		},
		delConfirm: function (product) {
			this.showModal = true;
			this.currentProduct = product;
		},
		delCurrentProduct: function () {
			this.showModal = false;
			var index = this.productList.indexOf(this.currentProduct);
			this.productList.splice(index,1);
            this.calcTotalMoney();
		}
	}
});
