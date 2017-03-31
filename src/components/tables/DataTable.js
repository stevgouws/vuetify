import Head from './mixins/head'
import Body from './mixins/body'
import Foot from './mixins/foot'

export default {
  name: 'datatable',

  mixins: [Head, Body, Foot],

  data () {
    return {
      asc: null,
      page: 1,
      rowsPerPage: 5,
      sorting: null,
      all: false
    }
  },

  props: {
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    itemValue: {
      default: 'value'
    },
    rowsPerPageItems: {
      type: Array,
      default () {
        return [5, 10, 25]
      }
    },
    selectAll: Boolean,
    search: {
      required: false
    },
    filter: {
      type: Function,
      default: (val, search) => {
        return val.toString().toLowerCase().indexOf(search) !== -1
      }
    },
    value: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    indeterminate () {
      const all = this.value.every(i => i[this.itemValue])

      return this.selectAll && this.value.some(i => i[this.itemValue]) && !all
    },
    pageStart () {
      return (this.page - 1) * this.rowsPerPage
    },
    pageStop () {
      return this.page * this.rowsPerPage
    },
    filteredItems () {
      let items = this.value
      const hasSearch = typeof this.search !== 'undefined' && this.search !== null

      if (hasSearch) {
        const search = this.search.toString().toLowerCase()

        items = items.filter(i => Object.keys(i).some(j => this.filter(i[j], search)))
      }

      return items.sort((a, b) => {
        const sortA = a[Object.keys(a)[this.sorting]]
        const sortB = b[Object.keys(b)[this.sorting]]

        if (this.asc) {
          if (sortA < sortB) return -1
          if (sortA > sortB) return 1
          return 0
        } else {
          if (sortA < sortB) return 1
          if (sortA > sortB) return -1
          return 0
        }
      }).slice(this.pageStart, this.pageStop)
    }
  },

  watch: {
    all (val) {
      this.$emit('input', this.value.map(i => {
        i[this.itemValue] = this.filteredItems.includes(i) ? val : false

        return i
      }))
    },
    rowsPerPage () {
      this.page = 1
    },
    indeterminate (val) {
      if (!val) this.all = true
    }
  },

  methods: {
    sort (index) {
      if (this.sorting === null) {
        this.sorting = index
        this.asc = true
      } else if (this.sorting === index && this.asc) {
        this.asc = false
      } else if (this.sorting !== index) {
        this.sorting = index
        this.asc = true
      } else {
        this.sorting = null
        this.asc = null
      }
    },
    genTR (children) {
      return this.$createElement('tr', {}, children)
    }
  },

  render (h) {
    return h('v-table-overflow', {}, [
      h('table', {
        'class': 'datatable'
      }, [
        this.genTHead(),
        this.genTBody(),
        this.genTFoot()
      ])
    ])
  }
}
