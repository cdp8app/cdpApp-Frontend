declare module "lucide-react" {
  import { ComponentType, SVGProps } from "react";
  
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
  export const  Briefcase: Icon;
  export const  Mail: Icon; 
  export const  Phone: Icon; 
  export const  CheckCircle2: Icon; 
  export const  XCircle: Icon; 
  export const  Clock3: Icon;
  export const  MessageSquare: Icon;
  export const  Download: Icon;
  export const  ExternalLink: Icon;
  export const  ChevronLeft: Icon;
  export const  CheckCircle: Icon;
  export const  AlertTriangle: Icon;
  export const  X: Icon;
  export const  Info: Icon;
  export const  Clock: Icon;
  export const  Filter: Icon;
  export const  Plus: Icon;
  export const  Check: Icon;
  export const  ChevronRight: Icon;
  export const  Circle: Icon;
  export const  ChevronUp: Icon;
  export const  Send: Icon;
  export const  Loader2: Icon;
  export const  RefreshCw: Icon;
  
  // Add any other icons you're using in your project
  
  // Default export
  export default Icon;
}