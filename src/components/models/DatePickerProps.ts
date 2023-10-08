export interface DatePickerProps {
    selectedDate: Date;
    onChange: (date: Date) => void;
    minDate?: Date;
    maxDate?: Date;
    disabled?: boolean;
    className?: string;
}
