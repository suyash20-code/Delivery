import {defineField, defineType} from 'sanity'

export default defineType({
    name:"featured",
    type:"document",
    title:"Featured Menu categories",
    fields:[
        {
            name: 'name',
            title: 'Featured Category name',
            type: 'string',
            validation: (Rule: { required: () => any; }) => Rule.required(),
        },
        {
            name: 'short_description',
            title: 'Short description',
            type: 'string',
            validation: (Rule: { max: (arg0: number) => any; }) => Rule.max(200),
        },
        {
            name: 'restaurants',
            title: 'Restaurants',
            type: 'array',
            of: [{type:"reference" , to:[{type:"restaurant"}]}],
        },
    ]
})