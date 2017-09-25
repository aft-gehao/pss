/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.afanti.psi.htmltopdf;


public interface PoolableObjectFactory<T> {
    /**
     * Creates an instance that can be served by the pool.
     * Instances returned from this method should be in the
     * same state as if they had been
     * {@link #activateObject activated}. They will not be
     * activated before being served by the pool.
     *
     * @return an instance that can be served by the pool.
     * @throws Exception if there is a problem creating a new instance,
     *    this will be propagated to the code requesting an object.
     */
    T makeObject() throws Exception;

    /**
     * Destroys an instance no longer needed by the pool.
     * <p>
     * It is important for implementations of this method to be aware
     * that there is no guarantee about what state <code>obj</code>
     * will be in and the implementation should be prepared to handle
     * unexpected errors.
     * </p>
     * <p>
     * Also, an implementation must take in to consideration that
     * instances lost to the garbage collector may never be destroyed.
     * </p>
     *
     * @param obj the instance to be destroyed
     * @throws Exception should be avoided as it may be swallowed by
     *    the pool implementation.
     * @see #validateObject
     * @see ObjectPool#invalidateObject
     */
    void destroyObject(T obj) throws Exception;

    /**
     * Ensures that the instance is safe to be returned by the pool.
     * Returns <code>false</code> if <code>obj</code> should be destroyed.
     *
     * @param obj the instance to be validated
     * @return <code>false</code> if <code>obj</code> is not valid and should
     *         be dropped from the pool, <code>true</code> otherwise.
     */
    boolean validateObject(T obj);

    /**
     * Reinitialize an instance to be returned by the pool.
     *
     * @param obj the instance to be activated
     * @throws Exception if there is a problem activating <code>obj</code>,
     *    this exception may be swallowed by the pool.
     * @see #destroyObject
     */
    void activateObject(T obj) throws Exception;

    /**
     * Uninitialize an instance to be returned to the idle object pool.
     *
     * @param obj the instance to be passivated
     * @throws Exception if there is a problem passivating <code>obj</code>,
     *    this exception may be swallowed by the pool.
     * @see #destroyObject
     */
    void passivateObject(T obj) throws Exception;
}
