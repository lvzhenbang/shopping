$(function () {
	var vm = new Vue({
		el: "body",
		data: {
			limitNum: 3,
			addressIndex: 0,
			addressList: [],
			isNextFlag: false,
			loadMoreFlag: false
		},
		ready: function () {
			this.loadingState = true;
			this.queryAddress();
		},
		methods: {
			queryAddress: function () {
				var _this = this;
				let a = 3;
				$.getJSON("data/address.json", function (res) {
					if (res.status == "0") {
						_this.addressList = res.result;
					}
				});
			},
			loadMoreData: function () {
				this.loadMoreFlag = !this.loadMoreFlag;
				if (this.loadMoreFlag) {
					this.limitNum = this.addressList.length;
				} else {
					this.limitNum = 3;
				}
			},
			setDefaultAddress: function (addrId) {
				var _this = this;
				_this.addressList.forEach(function (item) {

					if (item.addressId == addrId) {
						item.isDefault = true;
					} else {
						item.isDefault = false;
					}
					console.log(item.addressId + "::" + item.isDefault);
				});
			},
			delConfirm: function (k) {
				var _this = this;
				_this.delItem = k;
			},
			delUserAddress: function () {
				var _this = this;
				_this.confirmModalFlag = false;
				_this.addressList.$remove(h.delItem);
			}
		}
	});
});

//# sourceMappingURL=address-compiled.js.map