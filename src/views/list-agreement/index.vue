<template >
	<div class="app-container">
		<!-- 二维码弹窗 -->
		<el-dialog
		title="二维码"
		:visible.sync="codeVisible"
		width="30%" center>
		<img src="http://static.jianxueedu.com.cn/part4/wechat.png" style="margin: auto;
		display: block;
		margin-bottom: 45px;">
	</el-dialog>
	<!-- form弹窗 -->
	<el-dialog
	title="提示"
	:visible.sync="centerDialogVisible"
	width="40%"
	center>
	<div>
		<el-row>
			<el-col :span="20">
				<el-form ref="formm" :model="form" label-width="150px" :rules="rules">
					<el-form-item label="客户经理：" prop="manager">
						<el-input v-model="form.manager"></el-input>
					</el-form-item>
					
					<el-form-item label="成交用户：" prop="client">
						<el-input v-model="form.client"></el-input>
					</el-form-item>
					<el-form-item label="成交用户手机号：" prop="phonenumber">
						<el-input v-model="form.phonenumber"></el-input>
					</el-form-item>
					<el-form-item label="成交用户身份证号：" prop="idcard">
						<el-input v-model="form.idcard"></el-input>
					</el-form-item>
					<el-form-item label="商品分类：">
						<el-cascader
						v-model="selectDefault"
						:options="selectOptions"
						placeholder="请选择"
						:props="selectProps"
						@change="handleChange">
					</el-cascader>
				</el-form-item>
				<el-form-item label="成交方式：" prop="way">
					<el-input v-model="form.way"></el-input>
				</el-form-item>
				<el-form-item label="成交价格：" prop="price">
					<el-input v-model="form.price" @keyup.native="handleClick"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="addsign('form')">生成协议</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</div>
</el-dialog>

<el-button type="primary" class="productagreement" @click="centerDialogVisible = true">生成协议</el-button>
<!-- form -->
<el-form :inline="true"  class="demo-form-inline">
	<el-form-item label="成交用户">
		<el-input v-model="formInline.client" placeholder="手机号"></el-input>
	</el-form-item>
	<el-form-item label="客户经理">
		<el-input v-model="formInline.manager" placeholder="手机号"></el-input>
	</el-form-item></br>
	<el-form-item>
		<el-cascader
		v-model="selectDefault"
		:options="selectOptions"
		placeholder="请选择"
		:props="selectProps"
		@change="handleChange2">
	</el-cascader>
</el-form-item>
<el-form-item label="签署状态">
	<el-select v-model="formInline.signstatus" placeholder="未签署">
		<el-option label="未签署" value="1"></el-option>
		<el-option label="已签署" value="2"></el-option>
	</el-select>
</el-form-item>
<!-- <el-form-item label="创建时间">
	<el-date-picker
	v-model="formInline.starttime"
	type="date"
	placeholder="选择日期">
</el-date-picker>

<el-date-picker
v-model="formInline.endtime"
type="date"
placeholder="选择日期">
</el-date-picker> -->

<el-date-picker
v-model="formInline.createtime"
value-format="yyyy-MM-dd" 
type="daterange"
range-separator="至"
start-placeholder="开始日期"
end-placeholder="结束日期">
</el-date-picker>
</el-form-item>
</br>
<el-form-item label=""> 
	<el-button type="primary" @click="research">搜索</el-button>
</el-form-item>

</el-form>
<!-- table -->
<el-table
:data="tableData3"
height="500"
border
style="width: 100%">
<template slot="empty">
	暂无数据
</template>
<el-table-column
prop="index"
label="序号"
width="50" type="index">
</el-table-column>
<el-table-column
prop="user_name"
label="成交用户"
width="100">
</el-table-column>
<el-table-column
prop="user_mobile"
label="成交手机号"
width="150">
</el-table-column>
<el-table-column
prop="category_name"
label="课程名称">
</el-table-column>
<el-table-column
prop="manager_name"
label="客户经理">
</el-table-column>
<el-table-column
prop="prices"
label="成交价格" width="80">
</el-table-column>
<el-table-column
prop="create_time"
label="创建时间">
</el-table-column>
<el-table-column
label="签署状态">
<template slot-scope="scope">
	<p v-if="scope.row.is_signed==2" class="greencolor">已签署</p>
	<p v-else class="redcolor">未签署</p>
</template>
</el-table-column>
<el-table-column
label="操作">
<template slot-scope="scope">
	<div v-if="scope.row.is_signed==1">
		<el-button  size="mini" type="primary" @click="copy(scope.row.copy_url)">复制链接</el-button>
		<!-- <el-button  size="mini" type="primary" @click="codeVisible = true">二维码</el-button> -->
	</div>
	<div v-if="scope.row.is_signed==2">
		<a :href="scope.row.file_path">
			<el-button  size="mini" type="primary" >查看协议</el-button>
		</a>
		<!-- <el-button  size="mini" type="primary">下载</el-button> -->
	</div>
</template>
</el-table-column>
</el-table>
<!-- 分页 -->
<div class="my-page" v-if="count>0">
	<el-pagination
	background
	layout="prev, pager, next"
	@current-change="handleCurrentChange"
	:total="count">
</el-pagination>
</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { parseTime } from '@/utils'
import temRequest from '@/utils/tem-request'
export default {
	data() {
		return {
			count:0,
			centerDialogVisible:false,  //form弹窗
			codeVisible:false,//二维码弹窗
			selectProps: {
				expandTrigger: 'hover',
				value: 'id',
				label: 'name'
			},
			// 弹窗分类
			selectOptions: [],
			selectDefault: [1,2,3],
			// 弹窗
			form: {
				manager: '',
				client: '',
				phonenumber: '',
				way: '',
				price:'',
				categories:'',
				coursetitle:'',
				idcard:''
			},
			rules:{
				manager:[
				{required:true,message:'请输入客户经理名字'}
				],
				client:[
				{required:true,message:'请输入客户名字'}
				],
				phonenumber:[
				{required:true,message:'请输入手机号'}
				],
				idcard:[
				{required:true,message:'请输入身份证号'}
				],
				categories:[
				{required:true,message:'请选择商品分类'}
				],
				way:[
				{required:true,message:'请输入支付方式'}
				],
				price:[
				{required:true,message:'请输入正数的成交价格'}
				]
			},
			// 搜索
			formInline:{
				categories:'',
				client:'',
				manager:'',
				signstatus:'1',
				// starttime:'',
				// endtime:''
				createtime:[]
			},
			// 表格
			tableData3: []
		}
	},
	created(){
		var that = this;
		temRequest({
			url: '/getCategory',
			method: 'post',
			data: {
				
			}
		})
		.then(function(res){
			if(res.status == 200){
				that.selectOptions = res.data;
			}
		}).catch(function(err){
		})

		
		var a = this.selectDefault[this.selectDefault.length-1];
		this.getData(a);
		
	},
	methods:{
		handleClick(){
			this.form.price = this.form.price.replace(/[^\.\d]/g,'');
		},
		getData(a){
			var that = this;
			// 渲染列表
			temRequest({
				url: '/protocolContentList',
				method: 'post',
				data: {
					category_id:a,
					user_name:'',
					manager_name:'',
					is_signed:1,
					section:''
				}
			})
			.then(function(res){
				if(res.status == 200){
					that.tableData3 = res.data.result;
					that.count = res.data.count;
					
				}
			}).catch(function(err){
			})
			
		},

		copy(link) {
			var that = this;
			this.$copyText(link).then(function (e) {
				that.$message({
					type: 'info',
					message: '复制成功'
				}) 
			}, function (e) {
				that.$message({
					type: 'info',
					message: '复制失败'
				}) 
			})
		},

		// 当前点击页数
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
		// 点击搜索渲染列表
		research(){
			var that = this;
			var a = this.selectDefault[this.selectDefault.length-1];
			var time='';
			if(this.formInline.createtime[0]){
				time = this.formInline.createtime[0] + '/' +this.formInline.createtime[1];
			}
			let info = {
				category_id:a,
				user_mobile:this.formInline.client,
				manager_mobile:this.formInline.manager,
				is_signed:this.formInline.signstatus,
				section:time
			}
			// 渲染列表
			temRequest({
				url: '/protocolContentList',
				method: 'post',
				data: info
			})
			.then(function(res){
				if(res.status == 200){
					that.tableData3 = res.data.result;
					that.count = res.data.count;
					
				}
			}).catch(function(err){
			})

		},
		// 点击弹窗添加协议
		addsign(formName){
			let that = this;
			var a = this.selectDefault[this.selectDefault.length-1];
			
			that.$refs['formm'].validate((valid) => {
        // valid为true代表表单所有项都检验通过了
        if (!valid) {
        	console.log('请检查表单填写是否有误');
        	return false;
        }else{
        	console.log('表单填写正确');
        	//axios提交数据
        	let onesign = {
        		manager_name:this.form.manager,
        		user_name:this.form.client,
        		user_mobile:this.form.phonenumber,
        		manager_mobile:this.form.managerphone,
        		category_id:a,
        		pay_way:this.form.way,
        		prices:this.form.price,
        		id_card:this.form.idcard
        	}

        	console.log(onesign);
        	temRequest({
        		url: '/createProtocolContent',
        		method: 'post',
        		data: onesign
        	})
        	.then(function(res){
        		if(res.status == 200){
        			console.log(that.tableData3);
        			// that.tableData3.push(res.data);
        			that.getData(a);
        			console.log(res.data);
        			console.log(that.tableData3);
        			that.$message({
        				type: 'info',
        				message: '添加成功'
        			}) 
        			that.centerDialogVisible = false;
        		}
        	}).catch(function(err){
        		console.log(err);
        		console.log('catch');
        	})
        }
    });

			
		},
		handleChange(value) {
			console.log(value+'----------');
			// this.form.categories = value[value.length-1];
		},
		handleChange2(value) {
			console.log(value+'----------');
			// this.formInline.categories = value[value.length-1];
		},
		// onCopy(){
		// 	this.$message({
		// 		type: 'info',
		// 		message: '复制成功'
		// 	}) 
		// },
		// onError(){
		// 	this.$message({
		// 		type: 'info',
		// 		message: '复制失败'
		// 	}) 
		// }
	}
}
</script>

<style scoped>
.redcolor{
	color:red;
}
.greencolor{
	color:green;
}
.productagreement{
	position:absolute;
	top:30px;
	right:50px;
}
.el-select{
	width:100%;
}
.codeimg{
	height:800px;
}
.el-cascader{
	width:100%;
}
/*.el-date-editor .el-range-separator{
	width:10% !important;
}*/
.el-pagination{
	text-align: center;
}
</style>
