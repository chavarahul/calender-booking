"use client"
import React, { Children, cloneElement, ReactElement } from 'react'
import { cn } from '../../../lib/utils'
import { ButtonProps } from '@/app/components/ui/button';

interface iAppProps {
    className?: string;
    children: ReactElement<ButtonProps>[];
}

const ButtonGroup: React.FC<iAppProps> = ({
    className,
    children
}) => {
    const totalButtons = Children.count(children);
    return (
        <section
            className={cn("flex w-full", className)}
        >
            {children.map((child, index: number) => {
                const isFirstItem = index === 0;
                const isLastItem = index === totalButtons - 1;
                return cloneElement(child, {
                    className: cn({
                        "rounded-l-none": !isFirstItem,
                        "rounded-r-none": !isLastItem,
                        "border-l-0": !isFirstItem
                    },child.props.className)
                })
            })}
        </section>
    )
}

export default ButtonGroup