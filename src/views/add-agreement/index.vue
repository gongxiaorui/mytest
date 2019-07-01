<template >
  <div class="app-container">
    <!-- 查询表单 -->
    <el-row>
      <el-col :span="18">
        <el-form :inline="true" :model="formInline" ref="ruleForm" class="demo-form-inline">
          <el-form-item label="筛选">
          	<el-cascader
          		v-model="selectDefault"
          		:options="selectOptions"
          		placeholder="请选择"
          		:props="selectProps"
          		@change="handleChange">
          	</el-cascader>
          </el-form-item>
					
          <el-form-item>
            <el-button type="primary" @click="onSubmit('ruleForm')">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
			<el-col style="text-align: right;" :span="6">
					<el-button @click="goEdit" type="primary">新增协议</el-button>
			</el-col>
    </el-row>
    <br>
		
    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="agreement_name"
        label="协议名称">
      </el-table-column>
			
      <el-table-column
        prop="agreement_title"
        label="协议标题">
      </el-table-column>
			
      <el-table-column
        prop="agreement_kind"
        label="所属分类">
      </el-table-column>
			
			<el-table-column
			  prop="agreement_class"
			  label="所属班型">
			</el-table-column>
			
			<el-table-column
			  prop="agreement_status"
			  label="状态"
        width="90">
			</el-table-column>
			
			<el-table-column
			  label="创建时间"
				prop="agreement_date"
			  width="180">
			</el-table-column>
			
      <el-table-column
        width="260"
        label="操作">
        <template slot-scope="scope">
          <!-- <el-button @click="openDialog(scope.row)" size="mini">编辑</el-button> -->
          <el-button @click="goEdit(scope.row.id)" size="mini">编辑</el-button>
          <el-button @click="del(scope.row.id)" size="mini">删除</el-button>
          <el-button size="mini">启用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="my-page">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="100">
      </el-pagination>
    </div>
		

    <!-- dialog -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="rowData">
        <el-form-item label="协议名称">
          <el-input v-model="rowData.agreement_name"></el-input>
        </el-form-item>
        <el-form-item label="协议标题">
          <el-input v-model="rowData.agreement_title"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { parseTime } from '@/utils'

import temRequest from '@/utils/tem-request'



export default {
  data() {
    return {
      formInline: {
				region: '',
				hobby: ''
      },
      tableData: [
        {
          id: 256,
          agreement_name: '一年不过退费班',
          agreement_title: '注册消防工程师考前全科辅导培训协议',
          agreement_kind: '一级注册消防工程师',
          agreement_class: '3D智能保障班',
					agreement_status: '启用',
          agreement_date: '2019-06-27'

        }
      ],
      rowData: {},
      dialogFormVisible: false,
			
			
			selectProps: {
				expandTrigger: 'hover',
				value: 'id',
				label: 'name'
			},
			selectOptions: [
				{
					"id": 7,
					"name": "医药类",
					"agreement_id": 0,
					"is_show": 1,
					"parent_id": 0,
					"children": [
						{
							"id": 9,
							"name": "执业药师—中药学",
							"agreement_id": 0,
							"is_show": 1,
							"parent_id": 7,
							"children": [
								{
									"id": 15,
									"name": "中药学专业知识一",
									"agreement_id": 0,
									"is_show": 1,
									"parent_id": 9
								},
								{
									"id": 16,
									"name": "中药学专业知识二",
									"agreement_id": 0,
									"is_show": 1,
									"parent_id": 9
								},
								{
									"id": 17,
									"name": "中药学综合知识与技能",
									"agreement_id": 0,
									"is_show": 1,
									"parent_id": 9
								},
								{
									"id": 18,
									"name": "药事管理与法规",
									"agreement_id": 0,
									"is_show": 1,
									"parent_id": 9
								}
							]
						},
						{
							"id": 10,
							"name": "执业药师—西药学",
							"agreement_id": 0,
							"is_show": 1,
							"parent_id": 7,
							"children": [
								{
									"id": 11,
									"name": "药学专业知识一",
									"agreement_id": 0,
									"is_show": 1,
									"parent_id": 10
								},
								{
									"id": 12,
									"name": "药学专业知识二",
									"agreement_id": 0,
									"is_show": 1,
									"parent_id": 10
								},
								{
									"id": 13,
									"name": "药学综合知识与技能",
									"agreement_id": 0,
									"is_show": 1,
									"parent_id": 10
								},
								{
									"id": 14,
									"name": "药事管理与法规",
									"agreement_id": 0,
									"is_show": 1,
									"parent_id": 10
								}
							]
						}
					]
				},
				{
					"id": 8,
					"name": "学历类",
					"agreement_id": 0,
					"is_show": 1,
					"parent_id": 0,
					"children": []
				}
			],
			selectDefault: []
    }
  },
  created() {
		temRequest({
		  url: '/saveUserInfo',
		  method: 'post',
		  data: {
				id_card:'130182198809272410',
				user_mobile:'18514785236',
				protocol_id:'22'
			}
		}).then(function(res){
			console.log(res)
		}).catch(function(err){
			console.log(err)
		})
  },
  methods: {
    onSubmit(formName) {
			let that = this
      that.$refs[formName].validate((valid) => {
        // valid为true代表表单所有项都检验通过了
        if (!valid) {
          console.log('请检查表单填写是否有误');
          return false;
        }
        //axios提交数据
        console.log(that.formInline)
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    openDialog(e) {
      this.dialogFormVisible = true
      this.rowData = Object.assign({}, this.rowData, e)
    },
    del(e) {
      console.log('传过来的ID是:'+e)
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })          
      });
    },
		goEdit(e) {
			this.$router.push({
				path: e ? '/edit-agreement?id=' + e : '/edit-agreement'
			})
		},
		
		
		handleChange(value) {
			console.log(value);
		}
  },
  filters: {
		parseTime
  }
}
</script>

<style scoped>
	.my-page{
		margin-top: 40px;
		text-align: center;
	}
 
</style>
