class Table {
    constructor(tableNo, pax, limit = null, products = []) {
        this.tableNo = tableNo,
        this.openedAt = new DateTime(),
        this.pax = pax,
        this.limit = limit,
        this.products = []
    }
}

export default Table;