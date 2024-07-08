import mongoose, { Schema } from 'mongoose';

let profile_imgs_name_list = ["Garfield", "Tinkerbell", "Annie", "Loki", "Cleo", "Angel", "Bob", "Mia", "Coco", "Gracie", "Bear", "Bella", "Abby", "Harley", "Cali", "Leo", "Luna", "Jack", "Felix", "Kiki"];
let profile_imgs_collections_list = ["notionists-neutral", "adventurer", "fun-emoji"];


const userSchema = mongoose.Schema({

    personalInfo: {
        fullname: {
            type: String,
            lowercase: true,
            required: true,
            minLength: [3, 'fullname must be 3 letters logn'],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            unique: true,
            minLength: [3, "Username must be 3 letters long"],
        },
        bio: {
            type: String,
            minLength: [200, "Bio must be more than 200"],
            default: "",
        },
        profileImg: {
            type: String,
            default: () => {
                return `https://api.dicebear.com/6.x/${profile_imgs_collections_list[Math.floor(Math.random() * profile_imgs_collections_list.length)]}/svg?seed=${profile_imgs_name_list[Math.floor(Math.random() * profile_imgs_name_list.length)]}`
            }
        },
    },
    socialLinks: {
        youtube: {
            type: String,
            default: "",
        },
        instagram: {
            type: String,
            default: "",
        },
        twitter: {
            type: String,
            default: "",
        },
        facebook: {
            type: String,
            default: "",
        },
        github: {
            type: String,
            default: "",
        },
        website: {
            type: String,
            default: "",
        }
    },
    accountInfo: {
        totalPosts: {
            type: Number,
            dafault: 0
        },
        totalReads: {
            type: Number,
            default: 0
        },
    },
    googleAuth: {
        type: Boolean,
        default: false
    },
    blogs: {
        type: [Schema.Types.ObjectId],
        ref: 'blogs',
        default: [],
    }
},
{
    timestamps: {
        createdAt: "joinedAt"
    }
    

})

export default mongoose.model("users", userSchema);