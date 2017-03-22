var vm = new Vue({
	el: ".container",
	data: {
		showModal: false,
		editAddress: false,
		addAddress: false,
		deleteAddress: false,
        loadMoreFlag: false,
        isNextFlag: false,
		limitNum:2,
		addressIndex: 0,
		addressList: [],
		shoppingMethod:1,
		address: {
			userName : '',
			streetName : '',
			tel : ''
		}
	},
	mounted: function () {
		this.$nextTick(function () {
			this.loadingState = true;
			this.queryAddress();
		});
	},
	computed: {
		filteAddress:function (){
			return this.addressList.slice(0,this.limitNum)
		}
	},
	methods: {
		queryAddress: function () {
			var _this = this;
			let a= 3;
			this.$http.get("data/address.json").then(function (response) {
				var res = response.data;
				if(res.status=="0"){
					_this.addressList = res.result;
				}
			})
		},
		setDefaultAddress: function(addrId) {
			var _this = this;
			_this.addressList.forEach(function (item) {
				if(item.addressId==addrId){
					item.isDefault = true;
				}else{
					item.isDefault = false;
				}
				_this.addressIndex = addrId;
				// console.log(item.addressId+"::"+item.isDefault);
			});
		},
		/* 添加地址 */
		addNewAddress: function() {
			this.addAddress = true;
        	this.showModal = true;
		},
        addUserAddress: function() {
            this.showModal = false;
            this.addressList.push(this.address);
            this.address = '';
            this.addAddress = false;
        },
		addAddressClose: function(){
			this.showModal = false;
			this.addAddress = false;
		},
		/* 删除地址 */
		delCurrentAddress: function(){
			this.deleteAddress = true;
			this.showModal = true;
		},
		delUserAddress: function() {
			this.showModal = false;
			this.addressList.splice(this.addressIndex,1);
		},
		delAddressClose: function(){
			this.showModal = false;
			this.deleteAddress = false;
		},
		/* 编辑地址 */
		editCurrentAddress: function(addr){
            this.editAddress = true;
            this.showModal = true;
			this.address= addr;
		},
		editAddressClose: function(){
			this.showModal = false;
			this.editAddress = false;
		},
		/* 更多地址 */
        loadMoreAddress: function() {
            this.loadMoreFlag = !this.loadMoreFlag;
            if (this.loadMoreFlag) {
                this.limitNum = this.addressList.length;
            } else {
                this.limitNum = 2;
            }
        }
	}
});