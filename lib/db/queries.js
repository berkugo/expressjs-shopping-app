const db = require('./db');
const knex = require('knex');

const types = ['notype', 'classic', 'childsize', 'babysize', 'shoes', 'childshoes', 'babyshoes', 'underwear-top', 'underwear-bottom'];

module.exports = {
    async getAll(table) {
        return await db(table).select();
    },

    async getValue(sel, table, column, value) {
        const query = await db(table)
            .where(column, value)
            .select(sel);
        return query[0][sel];
    },

    async getCategories() {
        const categories = await db('categories').select('name');
        return categories.map(row => row.name);
    },

    async getCategoryByProductType(type) {
        const category = await db('productTypes')
            .where('productTypes.id', type)
            .select('category as name');
        return category[0].name;
    },

    async getProductTypesByCategory(category) {
        const types = await db('productTypes')
            .join('categories', 'productTypes.category', 'categories.id')
            .where('categories.name', category)
            .select('productTypes.name');
        return types.map(row => row.name);
    },

    async getProductsByProductType(type) {
        const products = await db('products')
            .select('products.name')
            .join('productTypes', 'productTypes.id', 'products.productType')
            .where('productTypes.name', type);
        return products.map(row => row.name);
    },

    async getUserInfoById(id) {
        const info = await db('users')
            .where('id', id)
            .select('clientname', 'clientsurname', 'phonenumber', 'idnumber', 'isAdmin');
        return info;
    },

    async getProductListing(category, type) {
        const listing = await db('products')
            .join('productTypes', 'products.productType', 'productTypes.id')
            .join('categories', 'productTypes.category', 'categories.id')
            .where({
                'categories.name': category,
                'productTypes.name': type
            })
            .groupBy('products.productCode')
            .orderBy('products.id')
            .select('products.id', 'products.name', 'products.price');
        return listing;
    },

    async getProductById(id) {
        const product = await db('products')
            .where('id', id)
            .select();
        return product[0];
    },

    async getProductColor(id) {
        const colors = await db('productColors')
            // .join('products', 'productColors.productCode', 'products.productCode')
            .where('product', id)
            .select('productColors.name');
        return colors[0].name;
    },

    async getProductColorsByCode(code) {
        const colors = await db('productColors')
            .where('productCode', code)
            .select();
        return colors;
    },

    async getProductSizes(id) {
        const sizes = await db('productSizes')
            .select('name', 'stock')
            .join('sizes', 'productSizes.size', 'sizes.id')
            .where('productSizes.product', id)
            .orderBy('sizes.id');
        return sizes;
    },

    async getProductStock(id, size) {
        const stock = await db('productSizes')
            .join('sizes', 'productSizes.size', 'sizes.id')
            .where({
                'productSizes.product': id,
                'sizes.name': size
            })
            .select('stock');
        return stock[0].stock;
    },

    async getProductStock(id) {
        const row = await db.raw(`select size, stock, (select type from sizes where id = (select size from productSizes where product = ${id} limit 1)) as type from productSizes ps where product = ${id}`);
        return {
            type: types[row[0][0].type],
            stocks: row[0].map(size => size.stock),
        }
    },

    async getUserById(id) {
        const user = await db('users')
            .where('id', id)
            .select();
        return user[0];
    },

    async getUserByMail(mail) {
        const user = await db('users')
            .where('email', mail.trim())
            .select();
        return user;
    },

    async updateUserInfo(id, update) {
        const query = await db('users')
            .where('id', id)
            .update(update);
        return query;
    },

    async addAddress(userId, address) {
        await db('addresses').insert({
            userId: userId,
            title: address.title,
            country: address.country,
            city: address.city,
            postalcode: address.postalcode,
            location: address.location,
            content: address.content
        });
    },

    async getAddress(userId) {
        const addresses = await db('addresses')
            .where('userId', userId)
            .select();
        return addresses;
    },

    async createUser(user) {
        await db('users').insert({
            email: user.email,
            password: user.password
        });
    },

    async createOrder(uid, cart) {
        if (cart && cart.length > 0) {
            const order = await db('orders').insert({
                user: uid
            }, ['id']);
            cart.forEach(async (item) => {
                const color = await this.getValue('id', 'productColors', 'name', item.color);
                const size = await this.getValue('id', 'sizes', 'name', item.size);
                await db('orderProducts').insert({
                    order,
                    product: item.id,
                    size,
                    color,
                    qty: item.qty
                });
            });
        }
    },

    async insertProduct(productInfo) {
        const pid = await db('products').insert({
            name: productInfo.product_title,
            description: productInfo.product_desc,
            productType: Number.parseInt(productInfo.product_type),
            price: productInfo.product_price,
            productCode: productInfo.product_code
        }, ['id']);

        await db('productColors').insert({
            name: productInfo.product_color,
            product: pid,
            productCode: productInfo.product_code
        });

        const sizes = await db('sizes')
            .select('id', 'name')
            .where('type', types.findIndex(type => type === productInfo.stock_type));

        const stocks = [];
        for (let i = 0; i < sizes.length; i++) {
            stocks.push({
                product: pid,
                size: sizes[i].id,
                stock: Number.parseInt(productInfo[sizes[i].name])
            });
        }
        await db('productSizes').insert(stocks);
        return pid;
    },

    async updateProduct(productInfo) {
        await db('products')
            .where('id', productInfo.id)
            .update({
                name: productInfo.product_title,
                description: productInfo.product_desc,
                productType: Number.parseInt(productInfo.product_type),
                price: productInfo.product_price,
                productCode: productInfo.product_code
            });

        await db('productColors')
            .where('product', productInfo.id)
            .update({
                name: productInfo.product_color,
                productCode: productInfo.product_code
            });

        const sizes = await db('productSizes')
            .select('size')
            .where('product', productInfo.id);

        sizes.forEach(async (row, i) => {
            await db('productSizes')
                .where({
                    'product': productInfo.id,
                    'size': row.size
                })
                .update('stock', Number.parseInt(Object.values(productInfo)[i]));
        });
    },

    async getOrdersOfUser(uid) {
        return db.raw(`select id, date, (select sum(qty) as qty from orderProducts op where op.order = id) as qty from orders where user = ${uid}`);
    },

    async getOrders()
    {
        return db('orders').select();
    },
    async getOrder(order) {
        return db('orderProducts')
            .select('products.id', 'products.name', 'products.price', 'sizes.name as size', 'productColors.name as color', 'qty')
            .join('products', 'products.id', 'orderProducts.product')
            .join('productColors', 'productColors.id', 'orderProducts.color')
            .join('sizes', 'sizes.id', 'orderProducts.size')
            .where({
                order
            });
    },
    async updateOrder(order, trackingnumber, cargoname)
    {
        return db.raw(`UPDATE orders SET trackingnumber='${trackingnumber}', company='${cargoname}' WHERE id = ${order}`);
    }
}
