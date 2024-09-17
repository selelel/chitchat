import { cva } from "class-variance-authority";

interface CategoryNavProps {
    text?: string;
    icon?: React.ReactNode;
    className?: string;
    href: string;
    isActive: boolean;
  }
  
export default function CategoryNav({ text, icon, href, isActive, className }: CategoryNavProps) {
  const user_selects = cva('flex space-x-2 items-end text-md active:opacity-50 duration-100', {
    variants: {
      isActive: {
        true: 'font-semibold'
      },
    },
  });
  
    return (
      <a
        href={href}
        className={user_selects({ isActive, className })}
      >
        {icon}
        <span>{text}</span>
      </a>
    );
  }