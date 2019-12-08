/* eslint-disable */
const state = {
    /**
     * @desc: editor
    */
    editor: null,
    /**
     * @desc: 当前编辑页
    */
    page: null,
    /**
     * @desc: 当前活动的对象，图形
    */
    active: {
        nodeType: '', // 表单类型
        color: "", // 颜色
        id: "", // 唯一id
        index: 3, // 层级
        label: "", // 名称
        shape: "flow-rect", // 类型
        size: "80*48", // 图形大小: width*height，单位px
        type: "node", // 图形类型
        x: 201, // 图形在画布中的横轴位置
        y: 103, // 图形在画布中的纵轴位置
        // 辅助数据
        width: 80, // 图形宽
        height: 48, // 图形高
        data: null, // 业务自定义属性
    },
    /**
     * @desc: 当前活动的对象，边
    */
    activePolyline: {
     id: '', // 唯一id
     index: '', // 层级
     shape: '',// 类型
     source: '', // 源id
     sourceAnchor: '', // 源定位点
     target: '', // 目标id
     targetAnchor: '' // 目标位点
    },
    /**
     * @desc: 必须填选值边属性的dialog状态
    */
    edgeParamsDialog: {
      status: false,
      values: []
    }
};

// getters
const getters = {
    /**
     * @desc: 获取当前活动对象
    */
    getActive: (state, getters) => {
        if (state.active.data && typeof state.active.data === 'string'){
         state.active.data = JSON.parse(state.active.data)
        }
        return state.active;
    },
    /**
     * @desc: 获取当前活动对象
    */
    getPage: (state, getters) => {
        return state.page;
    },
    /**
     * @desc: 获取当前活动对象
    */
    getEditor: (state, getters) => {
        return state.editor;
    }

};

// actions
const actions = {
    action({ commit, state }) {}
};

// mutations
const mutations = {
    /**
     * @desc: 设置editor
    */
    initEditor(state, data ) {
        state.editor = data
    },
    /**
     * @desc: 设置page
    */
    initPage(state, data) {
        state.page = data
    },
    /**
     * @desc: 设置当前活动对象
    */
    setActive(state, data) {
        state.active = data;
        state.active.size = `${data.width}*${data.height}`
    },
    /**
     * @desc: 更新当前画布中的活动对象
    */
    upDateActive(state, data) {
        const selectedItems = state.page.getSelected();
        selectedItems.forEach(item => {
            data.size = `${data.width}*${data.height}`
            state.page.update(item.id, data);
        });
    },
    /**
     * @desc: 设置当前活动的边，并开启必须设置边属性的dialog
    */
    setEdgeParamsDialog(state, data) {
      // 边属性设置完成请求关闭
      if (!data.ev && !data.status) {
        state.edgeParamsDialog.status = data.status
        return
      }
      // // 第二条至第n条边请求设置
      // if (data.ev && data.ev.item.source.edges.length > 1) {
      //   return
      // }
      // 第一条边请求设置
      if(data.ev && data.status) {
        state.edgeParamsDialog.values = data.ev.item.source.model.edgeOption.values
        state.edgeParamsDialog.status = data.status
        return
      }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
