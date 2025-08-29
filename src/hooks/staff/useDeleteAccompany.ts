import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/apis/axios";

export function useDeleteAccompany() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async (accompanyId: number) => {
            const { data } = await api.delete(`/accompanies/${accompanyId}`);
            return data;
        },
        onSuccess: _data => {
            qc.invalidateQueries({ queryKey: ["accompanyList"] }); // 목록 새로고침
        },
    });
}
