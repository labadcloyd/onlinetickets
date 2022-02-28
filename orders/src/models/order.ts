import { OrderStatus } from '@ticketlabs/common'
import { Schema, model, Model, Document as MongoDocument, ObjectId } from 'mongoose'
import { TicketDoc } from './ticket'

/* TYPESCRIPT BOILERPLATE */
// interface that describes the required fields to be entered to create a new model
interface ModelAttrs {
	userId: string,
	status: OrderStatus,
	expiresAt: Date,
	ticket: TicketDoc,
}
// interface that describes the properties of a single mongo document
interface MongoDoc extends MongoDocument {
	userId: string,
	status: OrderStatus,
	expiresAt: Date,
	ticket: TicketDoc,
	_id: ObjectId,
}
// interface that tells typescript about the new function added to ticket model
// "Model" is a built in typescript interface and not an actual mongoose object
interface MongoModel extends Model<MongoDoc> {
	build(attrs: ModelAttrs): MongoDoc;
}

const OrderSchema = new Schema({
	userId: {
		type: String,
		required: true
	},
	status: {
		type: String,
		enum: Object.values(OrderStatus),
		default: OrderStatus.Created,
		required: true
	},
	expiresAt: {
		type: Schema.Types.Date,
	},
	ticket: {
		type: Schema.Types.ObjectId,
		ref: 'Ticket',
		required: true
	}
},
// Changing how mongoose will return the object once it is sent over to the client
{
	timestamps: true,
	toJSON: {
		transform(doc, ret){
			ret.id = ret._id
			delete ret._id
			delete ret.__v
		}
	}
}

)

OrderSchema.statics.build = (attrs: ModelAttrs) => {
	return new Order(attrs)
}

const Order = model<MongoDoc, MongoModel>('Order', OrderSchema)

export { Order, MongoDoc as TicketTypes }