export type Question = {
   id: number;
   label: string;
   type: string;
   typeLabel: string;
   inputType: string;
   required: boolean;
   description: string;
   options?: Option[];
};
export type Option = {
   index: number;
   label: string;
   value: string | number;
};
export type QuestionDisplay = Pick<Question, 'label' | 'description' | 'required' | 'options'>;
export type QuestionBase = Pick<Question, 'id' | 'type' | 'typeLabel' | 'inputType'>;
export type QuestionFormInput = Pick<Question, 'label' | 'description' | 'required' | 'options'> & {
   showDesc: boolean;
};
export type OptionFormInput = Pick<Option, 'label'>
