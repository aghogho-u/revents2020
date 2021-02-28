import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncActionError, asyncActionFinish, asyncActionStart } from "../async/asyncReducer";
import { dataFromSnapshot } from "../firestore/firestoreService";

export default function useFirestoreDoc({query, data, deps}) {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(asyncActionStart());
        const unsubscribe = query().onSnapshot(
            snapshot => {
                if(!snapshot.exits){
                    dispatch(asyncActionError({code:'Not-found', message:'Couldn\'t find data'}))
                    return;
                }
                data(dataFromSnapshot(snapshot));
                dispatch(asyncActionFinish());
            },
            error => dispatch(asyncActionError(error))
        );
        return () => {
            unsubscribe()
        }
    }, deps) //eslint-disable-line react-hooks/exhaustive-deps
}