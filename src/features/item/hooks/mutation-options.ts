import { mutationOptions } from "@tanstack/react-query";
import { createItem, deleteItem, updateItem } from "../api";
import { handleApiError } from "@/lib/utils";
import { toast } from "sonner";

export function createItemMutationOptions() {
	return mutationOptions({
		mutationFn: createItem,
	});
}

export function updateItemMutationOptions(id: string) {
	return mutationOptions({
		mutationFn: (values: FormData) => updateItem(id, values),
	});
}

export function deleteItemMutationOptions() {
	return mutationOptions({
		mutationFn: deleteItem,
    onError: (error)=>{
      const message = handleApiError(error)
      if(message){
        toast.error(message)
      }
    }
	});
}
