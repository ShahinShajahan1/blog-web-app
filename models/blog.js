import mongoose from 'mongoose'; 
import {marked} from 'marked'; 
import slugify from 'slugify'; 
import createDomPurify from 'dompurify'; 
import { JSDOM } from 'jsdom'; 
const dompurify = createDomPurify(new JSDOM().window);

const blogSchema= new mongoose.Schema({ 
    title:{ 
        type:String, 
        required:true 
    }, 
    description:{ 
        type:String 
    }, 
    content:{ 
        type:String, 
        required:true 
    }, 
    createdDate:{ 
        type:Date, 
        default:Date.now
    }, 
    slug:{ 
        type:String, 
        required:true, 
        unique:true 
    }, 
    sanitizedHTML:{ 
        type:String, 
        required:true 
    } })

blogSchema.pre('validate',function(next){ 
    if (this.title) { 
        this.slug=slugify(this.title,{lower: true, strict:true});
    } 
    if (this.content){ 
        this.sanitizedHTML=dompurify.sanitize(marked(this.content)); }

    next()
}) 

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
