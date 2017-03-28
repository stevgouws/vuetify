export default {
  methods: {
    genPrevIcon () {
      return this.$createElement('v-btn', {
        props: {
          disabled: this.page === 1,
          icon: true
        },
        nativeOn: {
          click: () => (this.page--)
        }
      }, [
        this.$createElement('v-icon', {
        }, 'chevron_left')
      ])
    },
    genNextIcon () {
      return this.$createElement('v-btn', {
        props: {
          disabled: this.page * this.rowsPerPage >= this.items.length,
          icon: true
        },
        nativeOn: {
          click: () => (this.page++)
        }
      }, [
        this.$createElement('v-icon', {
        }, 'chevron_right')
      ])
    },
    genSelect () {
      return this.$createElement('div', {
        'class': 'datatable__actions__select'
      }, [
        'Rows per page:',
        this.$createElement('v-select', {
          props: {
            items: this.rowsPerPageItems,
            value: this.rowsPerPage,
            hideDetails: true,
            top: true
          },
          on: {
            input: val => (this.rowsPerPage = val)
          }
        })
      ])
    },
    genPagination () {
      const stop = this.items.length < this.pageStop
        ? this.items.length
        : this.pageStop

      return this.$createElement('div', {
        'class': 'datatable__actions__pagination'
      }, `${this.pageStart + 1}-${stop} of ${this.items.length}`)
    },
    genActions () {
      return [this.$createElement('div', {
        'class': 'datatable__actions'
      }, [
        this.genSelect(),
        this.genPagination(),
        this.genPrevIcon(),
        this.genNextIcon()
      ])]
    },
    genTFoot () {
      return this.$createElement('tfoot', [
        this.genTR([
          this.$createElement('td', {
            attrs: { colspan: '100%' }
          }, this.genActions())
        ])
      ])
    }
  }
}
