import {
  Bug,
  Circle,
  CircleAlert,
  CreditCard,
  Database,
  FileText,
  Folder,
  GitMerge,
  Hand,
  Image,
  type LucideIcon,
  Megaphone,
  MemoryStick,
  MessageSquareText,
  Newspaper,
  RefreshCw,
  TrendingUp,
  Waypoints,
  Zap,
} from 'lucide-react';

// The design (and its fixtures) name icons in Material Symbols vocabulary;
// the stack renders lucide. One mapping, kept where both sides can see it.
const designIcons: Record<string, LucideIcon> = {
  sync: RefreshCw,
  bolt: Zap,
  front_hand: Hand,
  hub: Waypoints,
  error: CircleAlert,
  rate_review: MessageSquareText,
  description: FileText,
  trending_up: TrendingUp,
  article: Newspaper,
  merge_type: GitMerge,
  database: Database,
  folder: Folder,
  memory: MemoryStick,
  credit_card: CreditCard,
  bug_report: Bug,
  campaign: Megaphone,
  image: Image,
};

export function designIcon(name: string): LucideIcon {
  return designIcons[name] ?? Circle;
}
