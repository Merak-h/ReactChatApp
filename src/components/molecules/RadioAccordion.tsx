import { Accordion, HStack, RadioGroup, Switch, VStack } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

type Props = {
    title:string;
    values:string[];
    defaultValue?:number;
    currentValue: string;
    setCurrentValue: (value:string)=>void;
    callback : (value:string)=>void;
}

export const RadioAccordion:FC<Props> = (props) => {
    const { title, values, defaultValue, currentValue, setCurrentValue, callback } = props;

    const [ openAccordion, setOpenAccordion ] = useState(defaultValue===0?["false"]:["true"]);
    const [ enable, setEnable ] = useState(currentValue!==values[0]);
    useEffect(()=>{
        setEnable(currentValue!==values[0]);
        setOpenAccordion(currentValue!==values[0]?["true"]:["false"]);
    },[currentValue]);

    return(
        <Accordion.Root value={openAccordion} collapsible border="sm" borderColor="#cccccc" borderRadius={4} w="100%" p={2}>
            <Accordion.Item value={"true"} w="100%">
                <Accordion.ItemTrigger>

                    <Switch.Root w="100%" justifyContent="space-between" checked={enable} onCheckedChange={e=>{
                            setEnable(e.checked);
                            e.checked?setCurrentValue(values[defaultValue??0]??values[1]):setCurrentValue(values[0]);
                            e.checked?setOpenAccordion(["true"]):setOpenAccordion(["false"]);
                            e.checked?callback(values[defaultValue??0]??values[1]):callback(values[0]);
                        }}>
                        <Switch.Label>{title}</Switch.Label>
                        <Switch.HiddenInput />
                        <Switch.Control />
                    </Switch.Root>

                </Accordion.ItemTrigger>
                <Accordion.ItemContent w="100%">
                    <Accordion.ItemBody w="100%" border-style="none" p={0}>
                        <RadioGroup.Root value={currentValue} onValueChange={(e) => {setCurrentValue(e.value);callback(e.value);}} w="100%">
                            <VStack w="100%" gap={0}>
                                {values.map((item,index) => (
                                    index===0? <></> :
                                <RadioGroup.Item 
                                    key={index} 
                                    value={item} 
                                    backgroundColor={item==currentValue?"#00000088":"#00000000"} 
                                    color={item==currentValue?"#ffffff":"#222222"}
                                    w="100%" 
                                    p={4} 
                                    borderTopStyle="solid" 
                                    borderTopWidth={1} 
                                    borderTopColor="#cccccc"
                                >
                                    <RadioGroup.ItemText>{item}</RadioGroup.ItemText>
                                    <RadioGroup.ItemHiddenInput />
                                </RadioGroup.Item>
                                ))}
                            </VStack>
                        </RadioGroup.Root>
                    </Accordion.ItemBody>
                </Accordion.ItemContent>

            </Accordion.Item>
        </Accordion.Root>
    );
}