// Desafio Clase 2 -Contenedor
// Alumno: Gabriel Moraga


//Importo el módulo fs
const fs = require('fs')


//
class Contenedor {
    constructor(url_file, productos = []) {
        this.url_file = url_file;
        this.productos = productos;

    }

/*/Asincrono
    async save(producto) {
        try {
            producto.id = this.productos.length + 1;
            this.productos.push(producto)
            
            const JSON_productos = JSON.stringify(this.productos, null, 2)
            await fs.promises.writeFile(`${this.url_file}`,`${JSON_productos}`, 'utf-8');

            
        }
        catch (error) {
            console.log(error)
        }

    }

//Sincrono: para que se ejecute correctamente el método save debe ser sincrono
    async save(producto) {
        try {
            const data = await this.getAll()
            this.productos = data
            producto.id = this.productos.length + 1;
            this.productos.push(producto)
            
            const JSON_productos = JSON.stringify(this.productos, null, 2)
            await fs.writeFileSync(`${this.url_file}`,`${JSON_productos}`, 'utf-8');    
        }
        catch (error) {
            console.log(error)
        }

    }
 */
    async save(producto) {
        try {
          
            const max = this.productos.reduce((a,b) => a.id > b.id ? a:b, {id:0})
            producto.id = max.id + 1;

            const data = await this.getAll()
            this.productos = data
            this.productos.push(producto)
            
            const JSON_productos = JSON.stringify(this.productos, null, 2)
            await fs.promises.writeFile(`${this.url_file}`,`${JSON_productos}`, 'utf-8');
            
 
        }
        catch (error) {
            console.log(error)
        }

    };


    async getById(Number) {
        try{
            const data = await fs.promises.readFile(`${this.url_file}`,'utf-8');
            const resp = JSON.parse(data)
            const product = resp[Number-1]
            console.log('getById----------------------------------------->')
            return product
        }

        catch (error) {
            console.log(error)
        }
    }


    async getAll() {
        try {
            const data = await fs.promises.readFile(`${this.url_file}`,'utf-8');
            const resp = JSON.parse(data)
            console.log('getAll----------------------------------------->')
            return resp

        }
        catch (error) {
            console.log(error)

        }
    }


    async deleteById(Number) {
        try{
            const data = await this.getAll()

            const filtered = data.filter(x => x.id !== Number);
            const JSON_filtered = JSON.stringify(filtered, null, 2)
            this.products = JSON_filtered // Actualizo el arry de productos para que coincida con el del archivo txt
            fs.writeFileSync(`${this.url_file}`,`${this.products}`, 'utf-8');    

            console.log('deleteById----------------------------------------->')
            return JSON_filtered
        }
        catch (error) {
            console.log(error)
        }
    }


    async deleteAll() {
    try{
        const data = await fs.promises.writeFile(`${this.url_file}`,'[]')
        console.log('deleteAll----------------------------------------->')
        return data

    }
    catch (error) {
        console.log(error)
    }
}

}

module.exports = Contenedor;

