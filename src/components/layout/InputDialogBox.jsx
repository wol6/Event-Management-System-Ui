import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function InputDialogBox({ open, setOpen, detailsObj, setDetailsObj, handleRegister }) {

    function handleSave() {
        if (detailsObj.count == '') {
            toast.warning("Minimun head count is 1")
            return
        }
        handleRegister()
        setOpen(false);
    }

    function handleChange(e) {
        const { name, value } = e.target

        if (value > 4) {
            toast.warning("Maximum head count is 4")
            return
        }

        setDetailsObj((prev) => {
            return { ...prev, [name]: value }
        })
    }
    return (
        <>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            How many people are you registering?
                        </DialogTitle>

                        <DialogDescription>
                            You can register a maximum of 4 people.
                        </DialogDescription>
                    </DialogHeader>

                    <Input
                        type="number"
                        name="count"
                        value={detailsObj.count}
                        onChange={handleChange}
                        placeholder="Enter number of people"
                    />

                    <Button onClick={handleSave} className={"bg-blue-600 hover:bg-blue-700"}>
                        Register
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default InputDialogBox