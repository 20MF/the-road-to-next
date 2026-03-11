import {Card, CardContent, CardDescription, CardFooter, CardHeader} from "@/components/ui/card";
import React from "react";

type CreateFormProps = {
    title: string,
    content: React.ReactNode,
    description: string,
    className?: string,
    footer?: React.ReactNode
}

const CardCompact = ({title, content, description, className, footer}: CreateFormProps) => {
    return (
        <Card className={className}>
            <CardHeader>
                {title}
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>

            <CardContent>
                {content}
            </CardContent>
            {footer && <CardFooter>{footer}</CardFooter>}
        </Card>
    )
}
export {CardCompact}