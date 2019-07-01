<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
				
        <el-form :model="formData" ref="ruleForm">
          <el-form-item label="协议名称">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          
			<el-form-item label="协议标题">
				<el-input v-model="formData.title"></el-input>
			 </el-form-item>
					
					<el-form-item label="所属班型">
						<el-cascader
							v-model="selectDefault"
							:options="selectOptions"
							placeholder="请选择"
							:props="selectProps"
							@change="handleChange">
						</el-cascader>
					</el-form-item>
					
					<!-- <div class="select-wrapper">
						<el-form-item prop="region">
							<el-select v-model="formData.region" placeholder="请选择活动区域">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item prop="hobby">
							<el-select v-model="formData.hobby" placeholder="请选择兴趣爱好">
								<el-option label="爬山" value="pashan"></el-option>
								<el-option label="烧烤" value="shaokao"></el-option>
							</el-select>
						</el-form-item>
					</div> -->
					
          
					<quill-editor 
						v-model="content"
						ref="myQuillEditor"
						:options="editorOption"
						@blur="onEditorBlur($event)">
					</quill-editor>
					
					<div class="confirm-btn">
						<el-form-item>
							<el-button>取消</el-button>
							<el-button type="primary" @click="onSubmit">保存</el-button>
						</el-form-item>
					</div>
					
        </el-form>
				
				
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { parseTime } from '@/utils'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  data() {
    return {
		formData: {
			name: '',
			title: '',
		},
		content: '<h2>I am Example</h2>',
		editorOption: {},
		editorHtml: '',
		
		
		
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
	  if (this.$route.query.id) {
		  
	  } else {
		  
	  }
  },
  methods: {
    onSubmit(formName) {
		let that = this
        //axios提交数据
        console.log(that.formData)
        console.log(that.content)
        console.log(that.selectDefault)
    },
	onEditorBlur(quill) {
		//console.log(quill.scroll.domNode.innerHTML)
		//console.log(this.content)
		//this.editorHtml = 
	},
	handleChange(value) {
		//console.log(value);
	}
  },
  components: { quillEditor }
}
</script>

<style>
	.select-wrapper{
		margin-bottom: 30px;
		display: flex;
		display: -webkit-flex;
		display: -moz-flex;
		display: -o-flex;
		display: -ms-flex;
		align-items: center;
	}
	.select-wrapper	.el-form-item{
		margin-right: 15px;
	}
.confirm-btn{
	margin-top: 40px;
	text-align: center;
}
</style>
