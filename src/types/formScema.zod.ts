
import z from 'zod/v4'


const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'application/pdf'
];
const FormSchema = z.object({
    reporterDetails:z.object({
      name:z.string().optional(),
      email:z.email('invalid Email ').optional()
    }).nullish(),
    issue:z.string('issue is required').min(5,'Put atleast 5 Characters'),
    ristLevel:z.enum(['Low','Medium','High','Critical']),
    issueType:z.array(z.string()).min(1,'Please select at least 1'),
    link:z.url('Invalid Url'),
    imageOrFile:z.instanceof(File,{message:'Please Upload a File or Image'})
    .refine(file=> file.size <= MAX_FILE_SIZE,'File must be less than 5MB' )
    .refine(file=> ACCEPTED_FILE_TYPES.includes(file.type),
   'Only images (JPEG, PNG, GIF) and PDF files are allowed'
  ).nullable()
})


export type FormType=z.infer<typeof FormSchema>

export default FormSchema