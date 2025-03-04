class Manager {
    constructor(model) {
        this.model = model
    }

    create = async (data) => {
        try {
            const one = await this.model.create(data)
            return one
        } catch (error) {
            throw error
        }
    }

    readAll = async (filter) => {
        try {
            const all = await this.model.find(filter).lean()
            /*.populate("user_id", "-_id email avatar") //Poblamos con las propiedades de user._id, trayendo solamente las propiedades email y avatar, y eliminando la propiedad _id. Pasamos de tener un ObjectId, a tener un objeto con las propiedades de los usuarios
            .populate("product_id", "title thumbnails price")*/ //Pero se utiliza el middleware pre para poder aplicarlo a distintos managers
            return all
        } catch (error) {
            throw error
        }
    }

    readById = async (id) => {
        try {
            const one = await this.model.findById(id)
            return one
        } catch (error) {
            throw error
        }
    }

    updateById = async (id, data) => {
        try {
            const opts = { new: true }
            const one = await this.model.findByIdAndUpdate(id, data, opts)
            return one
        } catch (error) {
            throw error
        }
    }

    deleteById = async (id) => {
        try {
            const one = await this.model.findByIdAndDelete(id)
            return one
        } catch (error) {
            throw error
        }
    }

    paginate = async (page, limit) => {
        try {
            const all = await this.model.paginate( {}, { page, limit }) //Primer parametro objeto filtrado, Segundo configuración de la paginación
            return all
        } catch (error) {
            throw error
        }
    }
}

export default Manager