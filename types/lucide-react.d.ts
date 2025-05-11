declare module 'lucide-react' {
  import { ComponentType, SVGProps } from 'react';
  
  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    stroke?: string | number;
    strokeWidth?: string | number;
  }
  
  type Icon = ComponentType<IconProps>;
  
  export const AlertCircle: Icon;
  export const ArrowLeft: Icon;
  export const Building: Icon;
  export const Calendar: Icon;
  export const ChevronDown: Icon;
  export const Eye: Icon;
  export const EyeOff: Icon;
  export const FileText: Icon;
  export const MapPin: Icon;
  export const Search: Icon;
  export const Upload: Icon;
  export const User: Icon;
  
  // Add any other icons you're using in your project
  
  // Default export
  export default Icon;
}