import { Request, Response } from "express"
import { jwtService } from "../../../application/jwtService"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { SETTINGS } from "../../../settings"
import mongoose, { Schema } from "mongoose"
import { ObjectId } from "mongodb"

export const testController = async (req: Request, res: Response) => {
    console.log(555555555);


    const personSchema = new mongoose.Schema({
        _id: Schema.Types.ObjectId,
        name: String,
        age: Number,
        stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
    });

    const storySchema = new mongoose.Schema({
        author: { type: Schema.Types.ObjectId, ref: 'Person' },
        title: String,
        fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
    });

    const Story = mongoose.model('Story', storySchema);
    const Person = mongoose.model('Person', personSchema);

    // const author = new Person({
    //     _id: new mongoose.Types.ObjectId().toString(),
    //     name: 'Ian Fleming',
    //     age: 50
    // });

    // await author.save();

    const author = await Person.
        findById(new ObjectId('671612cf385300945a0538ec')).
        populate('stories')

    // const story1 = new Story({
    //     title: 'Casino Royale',
    //     author: author._id // assign the _id from the person
    // });

    // await story1.save();

    // const story = await Story.
    //     findOne({ title: 'Casino Royale' }).
    //     populate('author')

    res.send({ author })
}